function testdrawing() {
    let graphList = [];
    if(!document.getElementById('graph-canvas')) {
        return;
    }

    var nodeRelations = document.querySelectorAll('#graph-raw-list li span.node-relation');
    for (let i = 0; i < nodeRelations.length; i++) {
        graphList.push(nodeRelations[i].textContent);
    }

    gitGraph(document.getElementById('graph-canvas'), graphList);

    if(document.getElementById('rev-container')) {
        document.getElementById('rev-container').style.width =
            'calc(100% + ' + document.getElementById('graph-canvas').style.width + ')';
    }
}