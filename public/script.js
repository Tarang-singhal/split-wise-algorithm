onload = function() {
    // create a network
    var curr_data;
    var container = document.getElementById('mynetwork');
    var container2 = document.getElementById('mynetwork2');
    var genNew = document.getElementById('generate-graph');
    var solve = document.getElementById('solve');
    var temptext = document.getElementById('temptext');
    // initialise graph options
    var options = {
        edges: {
            arrows: {
                to: true
            },
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial #1c36d3',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf406',
                size: 30, //50,
                color: 'red',
            }
        }
    };
    // initialize your network!
    var network = new vis.Network(container);
    network.setOptions(options);
    var network2 = new vis.Network(container2);
    network2.setOptions(options);

    function createData() {
        sz = Math.floor(Math.random() * 8) + 2;
        nodes = [];
        for (i = 1; i <= sz; i++) {
            nodes.push({ id: i, label: "Person " + i })
        }
        nodes = new vis.DataSet(nodes);

        edges = [];
        for (i = 1; i <= sz; i++) {
            for (j = i + 1; j <= sz; j++) {
                if (Math.random() > 0.5) {
                    if (Math.random() > 0.5)
                        edges.push({ from: i, to: j, label: String(Math.floor(Math.random() * 100) + 1) });
                    else
                        edges.push({ from: j, to: i, label: String(Math.floor(Math.random() * 100) + 1) });
                }
            }
        }
        data = {
            nodes: nodes,
            edges: edges
        };
        curr_data = data;
    }

    genNew.onclick = function() {
        createData();
        network.setData(curr_data);
        temptext.style.display = "inline";
        container2.style.display = "none";
    };

    solve.onclick = function() {
        temptext.style.display = "none";
        container2.style.display = "inline";
        solvedData = solveData();
        network2.setData(solveData());
    };

    function solveData() {
        data = curr_data;
        sz = data['nodes'].length;
        vals = Array(sz).fill(0);
        for (i = 0; i < data['edges'].length; i++) {
            edge = data['edges'][i];
            vals[edge['to'] - 1] += parseInt(edge['label']);
            vals[edge['from'] - 1] -= parseInt(edge['label']);
        }
        for (i = 0; i < sz; i++)
            console.log(vals[i]);
        console.log('\n');

        new_edges = [];
        for (i = 0; i < sz; i++) {
            if (vals[i] > 0) {
                for (j = 0; j < sz && vals[i] > 0; j++) {
                    if (vals[j] < 0) {
                        if (vals[j] + vals[i] >= 0) {
                            new_edges.push({ from: j + 1, to: i + 1, label: String(Math.abs(vals[j])) });
                            vals[i] += vals[j];
                            vals[j] = 0;
                        } else {
                            new_edges.push({ from: j + 1, to: i + 1, label: String(vals[i]) });
                            vals[j] += vals[i];
                            vals[i] = 0;
                        }
                    }
                }
            }
        }

        data = {
            nodes: data['nodes'],
            edges: new_edges
        };
        return data;
    }

    genNew.click();
};