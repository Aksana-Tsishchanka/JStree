var json = '{"text":"1","children":[{"text":"1.1","children":[{"text":"1.1.1"},{"text":"1.1.2"}]},{"text":"1.2","children":[{"text":"1.2.1","children":[{"text":"1.2.1.1"}]}]},{"text":"1.3","children":[{"text":"1.3.1","children":[{"text":"1.3.1.1"}]}]}]}';

var tree = JSON.parse(json);


function startBuildingTree(root) {

    var ul = document.createElement('ul');
    ul.className = 'Container';
  
    buildTree(root, ul, 0);
    document.body.appendChild(ul);
}

function buildTree(treeItem, htmlEl, level, isLast) {
    level++;

    var li = document.createElement('li');
    li.className = 'Node';
  
    //root
    if (level == 1) {
        li.className += ' IsRoot';
        li.className += ' ExpandOpen';  
        li.className += ' IsLast'; 
    }
    else {
        li.className += ' ExpandClosed';  
        //li.className += ' ExpandOpen';  
    }

    if (isLast) {
        li.className += ' IsLast'
    }


    var divExp = document.createElement('div');
    divExp.className = 'Expand';
    var divContent = document.createElement('div');
    divContent.className = 'Content';
    divContent.appendChild(document.createTextNode(treeItem.text));
    li.appendChild(divExp);
    li.appendChild(divContent);
    htmlEl.appendChild(li);

    if (treeItem.children) {
        console.log(treeItem.children.length);
        var childContainer = document.createElement('ul');
        childContainer.className = 'Container';
        li.appendChild(childContainer);

        for(var i = 0; i < treeItem.children.length; i++) {
            console.log(treeItem.children[i].text);
            if (i == treeItem.children.length - 1 ) {
            isLast = true;
            }
            else {
                isLast = false; 
            }
            
            buildTree(treeItem.children[i], childContainer, level, isLast);     
        }
    }
    else {
        li.className += ' isLast';
        li.className += ' ExpandLeaf';
        return;
    }
}

startBuildingTree(tree);


