var $$ = function(id) {
    var el;

    var obj = {
        //chainable methods
        printElement: function() {
            console.log(el);
            return obj;
        },

        addChild: function(element) {

            if (typeof element != 'string' && typeof element != 'object' ) {
                console.error('Parameters must be from type string!');
                return obj;
            }

            if (typeof element == 'object' ) {
                el.prepend(ele);
                return obj;
            }

            var ele = this.createElement(element);
            el.prepend(ele);
            return obj;
        },

        appendHTML: function(html){

            if (typeof html != 'string') {
                console.error('html parameter must be from type string!');
                return obj;
            }

            el.innerHTML += html;
            return obj;
        },

        selectChild: function(index) {

            if (typeof index != 'number' && index != undefined) {
                console.error('Index must be from type number or undefined!');
                return obj;
            }

            if (!index) {
                index = 0;
            }

            var children = el.children;

            if (index >= children.length) {
                console.error('This index of child does not exist!');
                return;
            }

            el = children[index];
            return obj;
        },

        selectParent: function() {
            var parent = el.parentElement;

            el = parent;
            return obj;
        },

        pSibling: function() {
            var upperSibling = el.previousSibling;

            el = upperSibling;
            return obj;
        },

        nSibling: function() {
            var lowerSibling = el.nextSibling;

            el = lowerSibling;
            return obj;
        },

        editId: function(newId) {

            if (typeof newId != 'string') {
                console.error('New id must be from type string!');
                return obj;
            }

            el.id = newId;
            return obj;
        },

        toggleClass: function(removeClass) {

            if (typeof removeClass != 'string') {
                console.error('Class must be from type string!');
                return obj;
            }

            el.classList.toggle(removeClass);
            return obj;
        },

        editData: function(data) {

            if (typeof data != 'string') {
                console.error('Data must be from type string!');
                return obj;
            }

            el.data = data;
            return obj;
        },

        editName: function(name) {

            if (typeof name != 'string') {
                console.error('Name must be from type string!');
                return obj;
            }

            el.setAttribute('name', name);
            return obj;
        },

        editText: function(text) {

            if (typeof text != 'string') {
                console.error('Text must be from type string!');
                return obj;
            }

            el.textContent = text;
            return obj;
        },

        editInnerHTML: function(innerHtml) {

            if (typeof innerHtml != 'string') {
                console.error('InnerHTML must be from type string!');
                return obj;
            }

            el.innerHTML = innerHtml;
            return obj;
        },

        addStyles: function(stylesObj) {

            if (typeof stylesObj != 'object') {
                console.error('Style must be from type object!');
                return obj;
            }

            Object.assign(el.style, stylesObj);
            return obj;
        },

        addEvent: function(ev, callback, capture) {

            if (typeof ev != 'string') {
                console.error('Event must be from type string!');
                return obj;
            }

            if (typeof callback != 'function') {
                console.error('Callback must be from type function!');
                return obj;
            }

            el.addEventListener(ev, callback, capture);
            return obj;
        },

        //Can not be chained
        createElement: function(element) {

            if (typeof element != 'string') {
                console.error('Element must be from type string!');
                return;
            }

            var newElement = document.createElement(element);

            return newElement;
        },

        getText: function() {
            return el.textContent;
        },

        getInnerHTML: function() {
            return el.innerHTML;
        },

        getChildren: function() {
            var children = el.children;
            return children;
        },

        getElement: function(id) {
            if (el) return el
            return document.querySelector(id);
        },

        deleteElement: function() {
            el.parentNode.removeChild(el);
        },
    };

    el = obj.getElement(id);
    return obj;
}

// var t = $$('#wrapper').addChild('div', 'a').addChild('div', 'b').addChild('div', 'c').selectChild().addChild('div', 'd');
// $$('#a').editId('asdf').toggleClass('aaa').editName('a').editText('asdf');
//
// $$('#asdf').addStyles({position:'relative', fontSize:'50px', left:'50%',}).addStyles({fontWeight:'700'}).addStyles({top:'100px'})
//     .selectParent().addStyles({background:'blue'}).selectChild(2).pSibling().editId('aa').nSibling().editId('bb');
//
// $$('#bb').addStyles({height: '100px', width:'300px', border: 'solid'});
// $$('#aa').addStyles({height: '100px', width:'300px', border: 'solid', position: 'fixed'});
//
// $$('#wrapper').addEvent('mouseover', function() {
//     console.log(2);
// });
//
// $$('#aa').addEvent('mouseover', function() {
//     $$('#aa').addStyles({background: 'red'});
// });
//
// $$('#aa').addEvent('mouseout', function() {
//     $$('#aa').addStyles({background: 'blue'});
// });
