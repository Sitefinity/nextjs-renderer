Widget development
======================================================

## How does it work
The WYSIWYG page editor of Sitefinity works with reusable components called widgets. Leveraging the power of the editor, developers can build custom SPA frontend for their users. This sample demonstrates how to integrate a custom front-end framework (such as React) in the page editor.

The whole renderer framework for the react renderer is already built (including integration with the WYSIWYG editor), so all there is to do is just write 'React widgets'. Developing widgets for the React Renderer is just like developing plain React Components. There are some integration points which we will go through. For this purpose find the bellow Hello World tutorial.

## Hello World sample
### Building the component

In order to build our own custom widget, we need to first create a folder that will hold our files. We will name our widget - ‘Hello World’ and it will be placed in the ‘hello-world' folder(under src/components). We then create a file in that folder called ‘hello-world.tsx’ that will host our react component. It will have the following content:

``` typescript

import React from "react";
import { ModelBase } from "../interfaces";
import { htmlAttributes } from "../../services/render-widget-service";
export function HelloWorldComponent(props: ModelBase<HelloWorldEntity>) {
    const dataAttributes = htmlAttributes(props, null, null);
    return (
        <h1 {...dataAttributes}>{props.Properties.Message}</h1>
    );
}

interface HelloWorldEntity {
    Message: string
}

```

### Building the designer

Second - we need to define the designer. This is done by creating a 'designer-metadata.json file' (name does not matter) and it will hold the metadata that will be read from the widget designer in order to construct the designer.

``` json
{
   "Name":"HelloWorld",
   "Caption":"HelloWorld",
   "PropertyMetadata":[
      {
         "Name":"Basic",
         "Sections":[
            {
               "Name":"Main",
               "Title":null,
               "Properties":[
                  {
                     "Name":"Message",
                     "DefaultValue":null,
                     "Title":"Message",
                     "Type":"string",
                     "SectionName":null,
                     "CategoryName":null,
                     "Properties":{

                     },
                     "TypeChildProperties":[

                     ],
                     "Position":0
                  }
               ],
               "CategoryName":"Basic"
            }
         ]
      },
      {
         "Name":"Advanced",
         "Sections":[
            {
               "Name":"AdvancedMain",
               "Title":null,
               "Properties":[

               ],
               "CategoryName":null
            }
         ]
      }
   ]
}
```

### Registration with the renderer framework
Once we have the above two files ready, we need to register the component implementation and the designer metadata with the React Renderer.

For the component we need to go to the file [render-widget-service](./src/services/render-widget-service.tsx) and to add a new entry to the TYPES_MAP object like so:

``` typescript

import { HelloWorldComponent } from "../components/hello-world/hello-world";

export const TYPES_MAP = {
    "SitefinityContentBlock": ContentBlock,
    "SitefinitySection": Section,
    "SitefinityContentList": ContentList,
    "HelloWorld": HelloWorldComponent
};

```

For the designer we need to go to the file [renderer-contract](./src/editor/renderer-contract.ts) and in the metadataMap object to add a new entry like so:
``` typescript

import helloWorldJson from '../components/hello-world/designer-metadata.json';

export class RendererContractImpl implements RendererContract {
    private metadataMap: { [key: string]: any } = {
        "SitefinityContentBlock": sitefinityContentBlockJson,
        "SitefinitySection": sitefinitySectionJson,
        "SitefinityContentList": sitefinityContentListJson,
        "HelloWorld": helloWorldJson
    }

```

Finally we need to register the widget to be shown in the widget selector interface. Go to the file [content-widgets.json](./src/editor/designer-metadata/content-widgets.json) and add a new entry after the SitefinityContentBlock registration:

``` json
{
    "name": "HelloWorld",
    "addWidgetName": null,
    "addWidgetTitle": null,
    "title": "Hello world",
    "initialProperties": []
}
```

Notice that everywhere above we are using the 'HelloWorld' name to register our component. This is a unique identifier for out component and is used everywhere where it is referenced.

## Deep dive
### Building the component

The props that are passed to the React Component hold the values that have been entered through the widget designer interface. So, when defining a ‘React Widget’, you will be working with the values that are entered through the automatically generated widget designer. The type of the props object must be defined as ModelBase<TEntityType>, where TEntityType is the type of the object that will be populated through the designer interface.

Additionally, you may have noticed that we have decorated the &lt;h1&gt; tag with a set of properties. These properties are added only in edit mode and are not added on the live rendering. They are needed so the page editor knows which type of widget is currently being rendered.

Each widget must have a wrapper tag. Having two tags side by side on root level of the html of the component is not supported.

### Building the designer

The fields that appear are defined through a JSON file in the 'renderer-contract.ts' file. [All the capabilities](https://www.progress.com/documentation/sitefinity-cms/autogenerated-field-types) of the automatic widget designers are available for all the types of renderers delivering a universal UI. We have provided an [all-properties.json](./src/components/all-properties.json) file that holds all the available combinations for properties that you can use for your widgets, and you can simply copy-paste from there. Additionally, we have provided three widget implementations that each have their own designer file as a reference.

Some clarification on the schema of the json file. It holds the followin properites:

1. Name – This much match the name of the widget with which it is registered in the renderer-contract.ts file and the render-widget-service.ts file.
2. Caption – The user friendly name of the widget that will be presented when the designer is opened
3. PropertyMetadata and PropertyMetadata flat both hold the metadata for all of the properites, with the exception that PropertyMetadata holds the metadata in a hierarchical manner. This property is used to construct widget designers. Whereas the flat collection is used for validation.
4. The more used metadata properties that define each field are:
 Name – the name of the field,
 DefaultValue – the default value
 Title – user friendly name of the field,
 Type - the type of the property – see the all-properties.json file for all types of fields.
 SectionName: the name of the section in which this field belongs
 CategoryName: null for Basic or Advanced
 Properties: holds additional metadata properties - see the all-properties.json file for more examples.
