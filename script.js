var $$ = function(id) {
    var el;

    function getElement(id) {
        if (el) return el
        return document.querySelector(id);
    }

    var obj = {
        //chainable methods
        addChild: function(element, id = '') {
            var ele = this.createElement(element);
            ele.setAttribute("id", id);
            el.appendChild(ele);
            return obj;
        },

        selectChild: function(index) {
            var child = el.childNodes;

            if (!index) {
                id = 0;
            }

            if (index >= child.length) {
                console.error('This index of child does not exist!');
                return;
            }

            el = child[index];
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
            el.id = newId;
            return obj;
        },

        toggleClass: function(removeClass) {
            el.classList.toggle(removeClass);
            return obj;
        },

        editData: function(data) {
            el.data = data;
            return obj;
        },

        editName: function(name) {
            el.setAttribute('name', name);
            return obj;
        },

        editText: function(text) {
            el.textContent = text;
            return obj;
        },

        editInnerHTML: function(text) {
            el.innerHTML = text;
            return obj;
        },

        addStyles: function(stylesObj) {
            Object.assign(el.style, stylesObj);
            return obj;
        },

        addEvent: function(ev, callback, capture) {
            el.addEventListener(ev, callback, capture);
        },

        //Can not be chained
        createElement: function(element, text = '') {
            var newElement = document.createElement(element);
            var txt = document.createTextNode(text);
            newElement.appendChild(txt);
            return newElement;
        },

        getText: function() {
            return el.textContent;
        },

        getInnerHTML: function() {
            return el.innerHTML;
        },

        deleteElement: function() {
            el.parentNode.removeChild(el);
        },
    };

    el = getElement(id);
    return obj;
}

var t = $$('#wrapper').addChild('div', 'a').addChild('div', 'b').addChild('div', 'c').selectChild(2).addChild('div', 'd');
$$('#a').editId('asdf').toggleClass('aaa').editName('a').editText('asdf');

$$('#asdf').addStyles({position:'relative', fontSize:'50px', left:'50%',}).addStyles({fontWeight:'700'}).addStyles({top:'100px'})
    .selectParent().addStyles({background:'blue'}).selectChild(2).pSibling().editId('aa').nSibling().editId('bb');

$$('#bb').addStyles({height: '100px', width:'300px', border: 'solid'});
$$('#aa').addStyles({height: '100px', width:'300px', border: 'solid', position: 'fixed'});

$$('#wrapper').addEvent('mouseover', function() {
    console.log(2);
});

$$('#aa').addEvent('mouseover', function() {
    $$('#aa').addStyles({background: 'red'});
});

$$('#aa').addEvent('mouseout', function() {
    $$('#aa').addStyles({background: 'blue'});
});
