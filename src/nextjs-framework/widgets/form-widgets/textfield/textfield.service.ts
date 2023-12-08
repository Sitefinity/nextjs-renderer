import { TextFieldEntity } from './textfield';

export class TextFieldService {

    static buildValidationAttributes(entity: TextFieldEntity) {
       const validationAttributes: {[key: string]: string} = {};

       if (entity.Required) {
        validationAttributes['required']='required';
       }

       if (entity.RegularExpression) {
        validationAttributes['pattern']= entity.RegularExpression;
       }

       return validationAttributes;
    }
}
