import { ParagraphEntity } from './paragraph';

export class ParagraphService {

    static buildValidationAttributes(entity: ParagraphEntity) {
       const validationAttributes: {[key: string]: string} = {};

       if (entity.Required) {
        validationAttributes['required']='required';
       }

       return validationAttributes;
    }
}
