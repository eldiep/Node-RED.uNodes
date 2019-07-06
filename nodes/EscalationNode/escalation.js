module.exports = function(RED) {
    function EscalationNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var status = -1;
            switch (true) {
                case (msg.payload <= config.errorlow || msg.payload >= config.errorhigh):
                    status = 2;
                    break;
                case (msg.payload <= config.warnlow || msg.payload >= config.warnhigh):
                    status = 1;
                    break;
                default:
                    status = 0;
                    break;
            }

            msg.payload = status;
            node.send(msg);
        });
    }
    RED.nodes.registerType("escalation",EscalationNode);
}
