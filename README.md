# Description
A tool to generate a object which key-value is a string of class names based on given config.


# input
```
{
  hello:{
   world: ['&', 'test1', '&-test2',{
     child: ['&']
   },]
  }
}
```

# output

```
 {
  "hello": {
    "_world": " hello-world test1 hello-world-test2",
    "world": {
      "_child": " hello-world-child"
    }
  }
}
```


