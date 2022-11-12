const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const thumbUp = document.getElementsByClassName("fa-thumbs-up")
const thumbDown = document.getElementsByClassName('fa-thumbs-down')

document.querySelector('#getQ').addEventListener('click', getDebate)

function getDebate (){
  const answerOne = Number(document.querySelector('#diff').value)
  const answerTwo = Number(document.querySelector('#topic').value)

  console.log(answerOne, answerTwo)

  let qSelector = answerOne + answerTwo 

  let questionBankArr = [
    'Not a question',
    'We should donate to charities that support humans over those that support animals.',
    'Technology is making us more distant than connected to people.',
    'Capital punishment is underused',
    "Nikita Dragun should be in a women's prison.",
    'Not a question',
    'Obesity should be treated as an illness.',
    'There is no more for feminism to do.',
    'Is global warming a real issue?',
    "Nikita Dragun should be in a women's prison."

  ]

  let finalAnswer = questionBankArr[qSelector]

  document.querySelector('#prompt').innerText = `${finalAnswer}`

}

deleteButton.addEventListener('click', _ => {
  console.log('working')
    fetch('/times', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shift: 'TIME IN',
        shift: 'TIME OUT'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No entry to delete') {
          messageDiv.textContent = 'Board is clear'
        } else {
          window.location.reload(true)
        }
      })
})

Array.from(thumbUp).forEach(function(element) {
  element.addEventListener('click', function(){
    const shift = this.parentNode.parentNode.childNodes[1].innerText
    const name = this.parentNode.parentNode.childNodes[3].innerText
    const msg = this.parentNode.parentNode.childNodes[5].innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
    fetch('thumbup', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'shift': shift,
        'name': name,
        'msg': msg,
        'thumbUp':thumbUp,
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});
Array.from(thumbDown).forEach(function(element) {
element.addEventListener('click', function(){
const shift = this.parentNode.parentNode.childNodes[1].innerText
const name = this.parentNode.parentNode.childNodes[3].innerText
const msg = this.parentNode.parentNode.childNodes[5].innerText
const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
fetch('thumbdown', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'shift': shift,
    'name': name,
    'msg': msg,
    'thumbUp':thumbUp,
  })
})
.then(response => {
  if (response.ok) return response.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
});
});
