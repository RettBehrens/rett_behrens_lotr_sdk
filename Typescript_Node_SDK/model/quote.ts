/**
 * Rett Behrens LOTR SDK
 * One API to rule them all - LibLab take home project - The Lord of the Rings SDK
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';

export class Quote {
    'id'?: string;
    'dialog'?: string;
    'movie'?: string;
    'character'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "_id",
            "type": "string"
        },
        {
            "name": "dialog",
            "baseName": "dialog",
            "type": "string"
        },
        {
            "name": "movie",
            "baseName": "movie",
            "type": "string"
        },
        {
            "name": "character",
            "baseName": "character",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Quote.attributeTypeMap;
    }
}
