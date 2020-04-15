document.getElementById('issueInputForm').addEventListener('submit',saveIssue);

function saveIssue(e) {
    console.log("Inside save Issue function")
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedTo').value;
    var issueId = uuidv4();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();

}

function setStatusClosed(id){
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(let i=0; i<issues.length;i++){
        if(issues[i].id == id ){
            issues[i].status = "Closed"
            break;
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id){
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(let i=0; i<issues.length;i++){
        if(issues[i].id == id ){
            issues.splice(i,1)
            break;
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issueList');
    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="well">' +
            '<h6> Issue ID:' + id + '</h6>' +
            '<p><span class = "label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p> <span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
            '<p> <span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning" >Close</a>' +
           '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
            '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '<br/>'+
            '</div>'

    }
}

function uuidv4() {
    return 'x4x-yx-xx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}