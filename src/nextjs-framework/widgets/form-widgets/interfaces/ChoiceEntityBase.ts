export interface ChoiceEntityBase {
      Label?: string;
      InstructionalText: string;
      Choices: {selected: boolean, value: string}[];
      Required: boolean;
      Hidden: boolean
      RequiredErrorMessage?: string;
      SfViewName: string;
      CssClass: string;
      SfFieldType: string
      SfFieldName: string
}
