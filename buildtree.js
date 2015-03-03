var json = '{"text":"1","children":[{"text":"1.1","children":[{"text":"1.1.1"},{"text":"1.1.2"}]},{"text":"1.2","children":[{"text":"1.2.1","children":[{"text":"1.2.1.1"}]}]},{"text":"1.3","children":[{"text":"1.3.1","children":[{"text":"1.3.1.1"}]}]}]}';

var tree = JSON.parse(json);


function startBuildingTree(root) {

    var ul = document.createElement('ul');
    ul.className = 'Container';
  
    var rootLi = buildTree(root, ul);
    rootLi.className = 'Node IsRoot ExpandOpen IsLast'
    var div = document.getElementById("tree");
    div.appendChild(ul);
}

function buildTree(treeItem, htmlEl) {
    var li = document.createElement('li');
    li.className = 'Node';
    li.className += ' ExpandClosed';  
    //li.className += ' ExpandOpen';
    var divExp = document.createElement('div');
    var divContent = document.createElement('div');
    divExp.className = 'Expand';
    divContent.className = 'Content';
    divContent.appendChild(document.createTextNode(treeItem.text));
    li.appendChild(divExp);
    li.appendChild(divContent);
    htmlEl.appendChild(li);

    if (treeItem.children) {
        var childContainer = document.createElement('ul');
        childContainer.className = 'Container';
        li.appendChild(childContainer);

        for(var i = 0; i < treeItem.children.length; i++) {  
            var childLi = buildTree(treeItem.children[i], childContainer);
            if (i == treeItem.children.length - 1 ) {
              childLi.className += ' IsLast'
            }
        }
    }
    else {
        li.className += ' ExpandLeaf';
    }
    return li;
}

startBuildingTree(tree);

addEventListener("click", function(event) {

    event = event || window.event;
        
    var clickedElem = event.target || event.srcElement;
    var parentElem = clickedElem.parentNode;

    if (parentElem.classList.contains('ExpandOpen')) {
        var newClass = parentElem.className.replace('ExpandOpen', 'ExpandClosed'); 
        parentElem.className = newClass;
    }
    else if (parentElem.classList.contains('ExpandClosed')) {
        var newClass = parentElem.className.replace('ExpandClosed', 'ExpandOpen'); 
        parentElem.className = newClass;
    }
});


