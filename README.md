# position-element

A simple function for positioning one DOM element relative to another DOM element (anchor element).

It is useful for implementing something like tooltips, dropdown/popups with support for these features: 

1. Automatically reposition element with best alternative placement if element renders out of browser view port.  
2. Supports 12 placements options. 

- up-left, up-center, up-right  
- down-left, down-center, down-right                                   
- left-top, left-middle, left-bottom  
- right-top, right-middle, right-bottom
3. Customizable distance and offset


# Example

```
import positionElement from 'position-element';

const config = {
  element: document.getElementById('subject'),
  anchorElement: document.getElementById('anchor'),
  preferredPlacement: 'down-center',
  distance: 10,
  alignmentOffset: 0,
  autoReposition: true,
};

positionElement(config);


```

# Live demo

[demo.html](https://linsight.github.io/position-element/demo.html)

# Tips

1. `positionElement` will do the measurement and set element's `position: absolute`, `left` and `top` style for you.
1. However, it is important for you to set the right `position` style (e.g. `position:relative` ) for the common container of both the anchor element and the positioning element. 

