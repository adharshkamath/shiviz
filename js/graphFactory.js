/**
 * Generates and returns a model from log lines. logLines is an array of
 * alternating log event, vector timestamp pairs. Assumes timestamps are in the
 * format 'localHostId {hostId_1:time_1, ..., hostId_n:time_n}'
 */
function generateGraphFromLog(logLines) {

    // TODO: fail gracefully

    if (logLines.length <= 1) {
        alert("No logs to display :(");
        return false;
    }

    var logEvents = [];

    var i = 0;
    try {
        for (i = 0; i < logLines.length; i++) {
            var log = logLines[i];
            if (log.length == 0)
                continue;
            i++;
            var stamp = logLines[i];
            var spacer = stamp.indexOf(" ");
            var host = stamp.substring(0, spacer);
            var clock = JSON.parse(stamp.substring(spacer));
            var vt = new VectorTimestamp(clock, host);

            logEvents.push(new LogEvent(log, host, vt, i));
        }

    }
    catch (err) {
        alert(err + "\n\nOn line " + (i + 1) + ":\n" + logLines[i] + "\n" + logLines[i + 1]);
        resetView();
        return null;
    }

    try {
        return new Graph(logEvents);
    }
    catch (err) {
        resetView();
        throw err;
    }

}
