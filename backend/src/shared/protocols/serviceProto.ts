import { ServiceProto } from 'tsrpc-proto';
import { ReqAddProduct, ResAddProduct } from './PtlAddProduct';

export interface ServiceType {
    api: {
        "AddProduct": {
            req: ReqAddProduct,
            res: ResAddProduct
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 5,
    "services": [
        {
            "id": 2,
            "name": "AddProduct",
            "type": "api"
        }
    ],
    "types": {
        "PtlAddProduct/ReqAddProduct": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "title",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "desc",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "price",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "pushUserId",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlAddProduct/ResAddProduct": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "id",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        }
    }
};