<?php
session_start();

if (!isset($_SESSION['tasks'])) {
    $_SESSION['tasks'] = ['hasasd', 'qwerty'];
}

// Handle AJAX request (for JavaScript task adding)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ajax'])) {
    $newTask = trim($_POST['task']);
    if ($newTask !== '') {
        $_SESSION['tasks'][] = $newTask;
        echo json_encode(['status' => 'success', 'message' => "Task \"$newTask\" added."]);
    } else {
        echo json_encode(['status' => 'error', 'message' => "Task cannot be empty."]);
    }
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Accessible To-Do List</title>
    <link rel="stylesheet" href="./style.css">
    <style>
        
    </style>
</head>
<body>

<a href="#main-content" class="skip-link">Skip to main content</a>

<h1>Accessible To-Do List</h1>

<table class="nav">
    <tr class="nav-tr">
        <th><a href="#main-content">Home</a></th>
        <th><a href="#inst">Instructions</a></th>
        <th><a href="#task-list">My Tasks</a></th>
    </tr>
</table>

<table>
    
    <tr>
        <td colspan="3" id="inst">
            <strong>Instructions</strong><br>
            Use the form below to add tasks. Use the keyboard (Tab, Enter) to navigate and interact.
        </td>
    </tr>
</table>

<hr>

<h2 id="main-content">My Tasks</h2>

<div class="task-input">
    <label for="new-task">New Task:</label>
    <input type="text" id="new-task" name="new-task" required>
    <button class="add-btn" id="add-task-btn">Add Task</button>
</div>

<ul class="task-list" id="task-list">
    <?php foreach ($_SESSION['tasks'] as $task): ?>
        <li><input type="checkbox"> <?php echo htmlspecialchars($task, ENT_QUOTES, 'UTF-8'); ?></li>
    <?php endforeach; ?>
</ul>

<div id="status-message" aria-live="polite"></div>

<script>
document.getElementById('add-task-btn').addEventListener('click', function () {
    const input = document.getElementById('new-task');
    const taskText = input.value.trim();
    if (!taskText) return;

    fetch("<?php echo $_SERVER['PHP_SELF']; ?>", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `ajax=1&task=${encodeURIComponent(taskText)}`
    })
    .then(res => res.json())
    .then(data => {
        const status = document.getElementById('status-message');
        status.textContent = data.message;

        if (data.status === 'success') {
            const li = document.createElement('li');
            li.innerHTML = `<input type="checkbox"> ${taskText}`;
            document.getElementById('task-list').appendChild(li);
            input.value = '';
        }
    });
});

document.getElementById('new-task').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('add-task-btn').click();
    }
});
</script>

</body>
</html>

