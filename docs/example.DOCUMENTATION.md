# ClassificationGroupInput

## Synopsis

ClassificationGroupInput react component. Provide possibility to search and select ClassificationGroups

### Props Reference

| Name                           | Type                     | Description                                                                                             |
| ------------------------------ | :----------------------  | -----------------------------------------------------------                                             |
| id                             | string                   | Id of component                                                                                         |
| name                           | string                   | Name of component                                                                                       |
| value                          | oneOfType: array, object | Current value of component. *Note*: if **multiple** prop is *true*, **value** must be array of objects. |
| onChange                       | func                     | Callback fired when the **value** changes                                                               |
| onFocus                        | func                     | Callback fired when the component take focus                                                            |
| onBlur                         | func                     | Callback fired when the component loose focus                                                           |
| multiple                       | bool                     | Allows to select several elements. *Note*: if *true*, **value** must be array of objects.               |
| readOnly                       | bool                     | Disallows any interaction with the component.                                                           |
| disabled                       | bool                     | Disallows any interaction with the component.                                                           |
| onlyLeafCouldBeSelected        | bool                     | Allows to select only leafs of classifications tree                                                     |

## Details

Write this section if needed.

## Code Example

```js
<ClassificationGroupInput
  serviceRegistry={serviceName => ({ url: 'http://localhost:3000' })}
  value={{
     classificationGroupId: 'EditableProductInformation',
     classification: {
       classificationId: 'basic'
     }
   }}
/>
```

## Contributors

Alexey Sergeev, Dmitry Divin, Daniel Zhitomirsky

## Component Name

ClassificationGroupInput

## License

Licensed by © 2016 OpusCapita 

