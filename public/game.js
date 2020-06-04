var table = document.getElementById('game_table')
var td = document.getElementsByTagName('td')
var th = document.getElementsByTagName('th')

function onstart() {
  for (var i = 0; i < td.length; i++) {
    td[i].style.backgroundColor = 'rgb(148, 148, 148)'
  }
  for (var i = 0; i < th.length; i++) {
    th[i].style.backgroundColor = 'rgb(150, 100, 100)'
  }
  table.ondragstart = function() {
    return false;
  }
  win_message_id.style.display = "none"
}
window.onload = onstart;

function togglecolour(cell){
  var background = cell.style.backgroundColor
  if (background == 'rgb(79, 79, 79)') {
    cell.style.backgroundColor = 'rgb(148, 148, 148)'
  }
  else {
    cell.style.backgroundColor = 'rgb(79, 79, 79)'
  }
  answercheck()
  row_check(cell)
  col_check(cell)
}

var md
var mu
function dragtogglecolour(mu) {
  if (mu != md) {
    var row_mouseup = parseInt(mu.classList[0].substring(1,))
    var row_mousedown = parseInt(md.classList[0].substring(1,))
    var col_mouseup = parseInt(mu.classList[1].substring(1,))
    var col_mousedown = parseInt(md.classList[1].substring(1,))

    if(row_mouseup != row_mousedown){
      if(col_mouseup == col_mousedown){
        if(row_mouseup > row_mousedown){
          for (var i = row_mousedown + 1; i <= row_mouseup; i++) {
            togglecolour(document.getElementsByClassName("c" + col_mouseup + " r" + i)[0])
          }
        }
        else{
          for (var i = row_mouseup; i <= row_mousedown - 1; i++) {
            togglecolour(document.getElementsByClassName("c" + col_mouseup + " r" + i)[0])
          }
        }
      }
    }

    if (col_mouseup != col_mousedown) {
      if(row_mouseup == row_mousedown){
        if(col_mouseup > col_mousedown){
          for (var i = col_mousedown + 1; i <= col_mouseup; i++) {
            togglecolour(document.getElementsByClassName("c" + i + " r" + row_mouseup)[0])
          }
        }
        else{
          for (var i = col_mouseup; i <= col_mousedown - 1; i++) {
            togglecolour(document.getElementsByClassName("c" + i + " r" + row_mouseup)[0])
          }
        }
      }
    }
  }
}
function answercheck(){
  var win = true
  var on = document.getElementsByClassName('on')
  for (var i = 0; i < on.length; i++) {
    if (on[i].style.backgroundColor == 'rgb(148, 148, 148)') {
      win = false
      break
    }
  }
  var off = document.getElementsByClassName('off')
  for (var i = 0; i < off.length; i++) {
    if (off[i].style.backgroundColor == 'rgb(79, 79, 79)') {
      win = false
      break
    }
  }
  if(win == true){
    th[0].style.backgroundColor = 'rgb(100, 150, 100)'
    toggle_win_message()
  }
  else {
    th[0].style.backgroundColor = 'rgb(150, 100, 100)'
    win_message_id.style.display = "none"
  }
}

function toggle_win_message() {
  if (win_message_id.style.display == "block") {
    win_message_id.style.display = "none"
  }
  else {
    win_message_id.style.display = "block"
  }
}

function col_check(cell){
  var right = true
  var x = cell.classList

  var idon = x[1] + " on"
  var idoff = x[1] + " off"
  var on = document.getElementsByClassName(idon)
  var off = document.getElementsByClassName(idoff)
  for (var i = 0; i < on.length; i++) {
    if (on[i].style.backgroundColor == 'rgb(148, 148, 148)') {
      right = false
      break
    }
  }
  for (var i = 0; i < off.length; i++) {
    if (off[i].style.backgroundColor == 'rgb(79, 79, 79)') {
      right = false
      break
    }
  }
  var th = document.getElementsByClassName(x[1])
  if(right == true){
    th[0].style.backgroundColor = 'rgb(100, 150, 100)'
  }
  else {
    th[0].style.backgroundColor = 'rgb(150, 100, 100)'
  }
}

function row_check(cell){
  var right = true
  var x = cell.classList

  var idon = x[0] + " on"
  var idoff = x[0] + " off"
  var on = document.getElementsByClassName(idon)
  var off = document.getElementsByClassName(idoff)
  for (var i = 0; i < on.length; i++) {
    if (on[i].style.backgroundColor == 'rgb(148, 148, 148)') {
      right = false
      break
    }
  }
  for (var i = 0; i < off.length; i++) {
    if (off[i].style.backgroundColor == 'rgb(79, 79, 79)') {
      right = false
      break
    }
  }
  var th = document.getElementsByClassName(x[0])
  if(right == true){
    th[0].style.backgroundColor = 'rgb(100, 150, 100)'
  }
  else {
    th[0].style.backgroundColor = 'rgb(150, 100, 100)'
  }
}

var win_message_id = document.getElementById('win_message')
var togglecolour_evt = (evt)=>{togglecolour(evt.target)}
var dragtogglecolour_evt = (evt)=>{dragtogglecolour(evt.target)}
var board_state = []
function toggle_sol() {
  if(document.getElementById('toggle_sol').innerHTML == "show solution"){
    for (var i = 0; i < td.length; i++) {
      board_state[i] = td[i].style.backgroundColor
    }
    var on = document.getElementsByClassName('on')
    for (var i = 0; i < on.length; i++) {
      on[i].style.backgroundColor = 'rgb(79, 79, 79)'
    }
    var off = document.getElementsByClassName('off')
    for (var i = 0; i < off.length; i++) {
      off[i].style.backgroundColor = 'rgb(148, 148, 148)'
    }
    table.removeEventListener('mousedown',togglecolour_evt)
    table.removeEventListener('mouseup',dragtogglecolour_evt)
    document.getElementById('toggle_sol').innerHTML = "hide solution"
  }
  else{
    for (var i = 0; i < td.length; i++) {
      td[i].style.backgroundColor = board_state[i]
    }
    table.addEventListener('mousedown',togglecolour_evt)
    table.addEventListener('mouseup',dragtogglecolour_evt)
    document.getElementById('toggle_sol').innerHTML = "show solution"
  }
}

table.addEventListener('mousedown',togglecolour_evt)
table.addEventListener('mousedown',(evt)=>{md = evt.target})
table.addEventListener('mouseup',dragtogglecolour_evt)
document.getElementById('reset_button').onclick = onstart
document.getElementById('toggle_sol').onclick = toggle_sol
win_message_id.onclick = toggle_win_message
