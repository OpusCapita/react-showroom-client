### Synopsis

ClassificationGroupInput react component. The part of 
[**jcatalog-react-reference-search**](http://buildserver.jcatalog.com/gitweb/?p=js-react-reference-search.git)

### Code Example

```
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

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| id | string | Id of component |
| name | string | Name of component |
| value | oneOfType: array, object | Current value of component. *Note*: if **multiple** prop is *true*, **value** must be array of objects. |
| onChange | func | Callback fired when the **value** changes |
| onFocus | func | Callback fired when the component take focus |
| onBlur | func | Callback fired when the component loose focus |
| multiple | bool | Allows to select several elements. *Note*: if *true*, **value** must be array of objects. |
| readOnly | bool | Disallows any interaction with the component. |
| disabled | bool | Disallows any interaction with the component. |
| serviceRegistry | func | ????? Hard to describe it. ????? |
| selectedClassification | object | obj/str?????. |
| onlyLeafCouldBeSelected | bool | Allows to select only leafs of classifications tree |

### Contributors
Alexey Sergeev, Dmitry Divin, Daniel Zhitomirsky

[GIT REPOSITORY](http://buildserver.jcatalog.com/gitweb/?p=js-react-reference-search.git)

### Component Name

ClassificationGroupInput

### Tags

ReferenceSearches

### License

Licensed by © 2016 OpusCapita 

