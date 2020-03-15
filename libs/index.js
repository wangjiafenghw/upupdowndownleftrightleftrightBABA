// 秘籍code和明文对照
var keyCodeMap = {
    '38': {
        label: '上'
    },
    '40': {
        label: '下'
    },
    '37': {
        label: '左'
    },
    '39': {
        label: '右'
    },
    '66': {
        label: 'B'
    },
    '65': {
        label: 'A'
    }
};
var defaultCommand = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 66, 65];
var timeout = 1000;
var currentTime = 0;
var current = [];
var timer = null;

function init() {
    timeout = 1000;
    currentTime = 0;
    current = [];
    timer = null;
}

$(document).keydown(function(event){
    if (currentTime === 0) {
        // 0值代表复位，深拷贝命令数组
        current = [].concat(defaultCommand);
    }
    if (current.length > 0 && current[0] === event.keyCode) {
        console.log('okok')
        currentTime = Date.now()
        current.shift();
        console.log(current)
        if (timer) {
            console.log('删除')
            clearTimeout(timer);
        }
        if (current.length === 0) {
            timeout = 0;
        }
        timer = setTimeout(function(){
            if (current.length === 0) {
                init();
                console.log('完成')
                run()
            } else {
                console.log('操作超时')
                currentTime = 0;
            }
        }, timeout)
    } else if(current.length === 0) {
        console.log('完成')
    } else {
        // 复位
        currentTime = 0;
    }
});

function run() {
    var root = document.getElementById('root');
    console.log(root)
    var els = iterator();
    for(var i=0;i<els.length;i++){
        console.log(els[i])
        myMove(els[i], i);
    }
}

var iTime = [];

function myMove(obj, index) {
    clearInterval(iTime[index]);
    var oSpeedX = parseInt(Math.random() * 6 + 3);
    var oSpeedY = parseInt(Math.random() * 6 + 3);
    obj.style.position = 'fixed';
    iTime[index] = setInterval(function() {
        if (obj.offsetTop >= document.documentElement.clientHeight - obj.offsetHeight) {
            obj.style.top = document.documentElement.clientHeight - obj.offsetHeight + "px";
            oSpeedY *= -1;
        } else if (obj.offsetTop <= 0) {
            oSpeedY *= -1;
        }
        if (obj.offsetLeft >= document.documentElement.clientWidth - obj.offsetWidth) {
            obj.style.left = document.documentElement.clientWidth - obj.offsetWidth + "px";
            oSpeedX *= -1;
        } else if (obj.offsetLeft <= 0) {
            oSpeedX *= -1;
        }
        obj.style.left = obj.offsetLeft + oSpeedX + "px";
        obj.style.top = obj.offsetTop + oSpeedY + "px";
    }, 30)

}

function iterator(){
    var DFS = {
        nodes: [],
        do (root) {
            for (var i = 0;i < root.childNodes.length;i++) {
                var node = root.childNodes[i];
                // 过滤 text 节点、script 节点
                if ((node.nodeType != 3) && (node.nodeName != 'SCRIPT')) {
                    if(!node.children || node.children.length<1){
                        this.nodes.push(node);
                    }
                    this.do(node);
                }
            }
            return this.nodes;
        }
    }
    return DFS.do(document.body)
}

function stop(){
    // 并不能停
}
