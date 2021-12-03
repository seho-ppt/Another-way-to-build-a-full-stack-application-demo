<template>
  <div class="App">
    <a-form layout="inline" :model="formState" ref="formRef">
      <a-form-item name="title">
        <a-input v-model:value.trim="formState.title" placeholder="产品名称" />
      </a-form-item>
      <a-form-item name="desc">
        <a-input v-model:value.trim="formState.desc" placeholder="产品介绍" />
      </a-form-item>
      <a-form-item name="minPrice">
        <a-input v-model:value.trim="formState.minPrice" placeholder="最小价格" />
      </a-form-item>
      <a-form-item>
        <a-button @click="handleReset">重置</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSearch">搜索</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="addVisible = true">新增产品</a-button>
      </a-form-item>
    </a-form>
    <div class="table">
      <a-table
        :pagination="pagination"
        :data-source="formData"
        :loading="productLoading"
        rowKey="id"
        bordered
        @change="handleTableChange"
      >
        <a-table-column key="id" title="产品ID" data-index="id" />
        <a-table-column key="title" title="产品标题" data-index="title" />
        <a-table-column key="desc" title="产品详情" data-index="desc" />
        <a-table-column key="price" title="产品价格" data-index="price" />
      </a-table>
    </div>
    <a-modal v-model:visible="addVisible" title="添加产品">
      <a-form :model="addFormState" ref="addFormRef">
        <a-form-item name="title">
          <a-input v-model:value.trim="addFormState.title" placeholder="产品名称" />
        </a-form-item>
        <a-form-item name="desc">
          <a-input v-model:value.trim="addFormState.desc" placeholder="产品介绍" />
        </a-form-item>
        <a-form-item name="price">
          <a-input v-model:value.trim="addFormState.price" placeholder="价格" />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button key="back" @click="addVisible = false">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="addProductMutateLoading"
          @click="handleAdd"
        >新增</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { apolloClient } from "./initGraphqlClient"
import { provideApolloClient, useQuery, useMutation } from '@vue/apollo-composable'
import { GET_PRODUCTS, ADD_PRODUCT } from "./graphql/products"

provideApolloClient(apolloClient)

interface FormState {
  title: string | null;
  desc: string | null;
  minPrice: number | string | null;
  limit: number,
  offset: number
}

interface FormData {
  title: string;
  desc: string;
  price: string;
}

interface AddFormState {
  title: string;
  desc: string;
  price: number | null;
  pushUserId: number
}

const formRef = ref();
const addFormRef = ref();
const addVisible = ref(false)

// 表单配置
const pagination = ref({
  total: 0,
  pageSize: 10,
  current: 1,
})

const formState = ref<FormState>({
  title: "",
  desc: "",
  minPrice: null,
  limit: pagination.value.pageSize,
  offset: 0
})

const addFormState = ref<AddFormState>({
  title: "",
  desc: "",
  price: null,
  pushUserId: 1
})

const searchState = ref<FormState>(formState.value)

const formData = ref<FormData[] | null>()

// 构造查询
const { result: product, loading: productLoading, fetchMore } = useQuery<{
  products: FormData[] | null,
  products_aggregate: { aggregate: { count: number } }
}, Partial<FormState>>(GET_PRODUCTS, {
  limit: formState.value.limit,
  offset: formState.value.offset
})

watch(product, () => {
  formData.value = product.value!.products
  pagination.value.total = product.value!.products_aggregate.aggregate.count
})

const getList = () => {
  const { title, minPrice, desc, limit } = formState.value
  searchState.value = {
    title: title !== "" ? `%${title}%` : null,
    desc: desc !== "" ? `%${desc}%` : null,
    minPrice: minPrice ? Number(minPrice) : null,
    limit,
    offset: (pagination.value.current - 1) * limit
  }
  fetchMore({
    variables: searchState.value
  })
}

const handleSearch = () => {
  pagination.value.current = 1
  getList()
}

// 表格change的处理函数
const handleTableChange = (page: { current: number }) => {
  pagination.value!.current = page.current
  getList()
}

// 重置
const handleReset = () => {
  formRef.value.resetFields()
  // 页数初始化为1
  pagination.value.current = 1
  getList()
}

const { mutate: addProductMutate, loading: addProductMutateLoading, onDone: onAddProductDone } = useMutation<{ id: string }, { params: AddFormState }>(ADD_PRODUCT)

// 添加产品
const handleAdd = () => {
  addProductMutate({
    params: {
      ...addFormState.value,
      price: Number(addFormState.value.price)
    }
  })
}

onAddProductDone(() => {
  addFormRef.value.resetFields()
  pagination.value.current = 1
  addVisible.value = false
  getList()
})

</script>

<style lang="less">
@import "./App.less";

.table {
  margin-top: 30px;
}
</style>
