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
import { Movie } from './movie';

export class GetMovies200ResponseAllOf {
    'docs'?: Array<Movie>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "docs",
            "baseName": "docs",
            "type": "Array<Movie>"
        }    ];

    static getAttributeTypeMap() {
        return GetMovies200ResponseAllOf.attributeTypeMap;
    }
}

