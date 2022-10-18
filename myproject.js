let projects = []

function addProject(event) {
  event.preventDefault()

  let name = document.getElementById('inputName').value
  let startDate = document.getElementById('inputStartDate').value
  let endDate = document.getElementById('inputEndDate').value
  let desc = document.getElementById('inputDesc').value
  let icons = {
    nodeJs: document.querySelector('input[name="checkboxNodejs"]').checked,
    reactJs: document.querySelector('input[name="checkboxReactJs"]').checked,
    javaScript: document.querySelector('input[name="checkboxJavaScript"]')
      .checked,
    vueJs: document.querySelector('input[name="checkboxVueJs"]').checked,
  }
  let dataImage = document.getElementById('inputImage').files[0]

  dataImage = URL.createObjectURL(dataImage)

  let project = {
    title: name,
    startDate: startDate,
    endDate: endDate,
    description: desc,
    icon: icons,
    image: dataImage,
    postAt: new Date(),
  }

  projects.push(project)

  renderCard()
}

function getFullTime(time) {
  let monthName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  let hours = time.getHours()
  let minutes = time.getMinutes()
  let dateNow = time.getDate()
  let monthNow = time.getMonth()
  let year = time.getFullYear()

  if (hours <= 9) {
    hours = '0' + hours
  }
  if (minutes <= 9) {
    minutes = '0' + minutes
  }
  return `${dateNow} ${monthName[monthNow]} ${year} ${hours}:${minutes} WIB`
}

function getDistanceTime(time) {
  let timeNow = new Date()
  let timePost = time

  let distance = timeNow - timePost

  let distanceDay = Math.floor(distance / (1000 * 3600 * 24))
  let distanceHours = Math.floor(distance / (1000 * 60 * 60))
  let distanceMinutes = Math.floor(distance / (1000 * 60))
  let distanceSecond = Math.floor(distance / 1000)

  if (distanceDay > 0) {
    return `${distanceDay} day(s) ago`
  } else if (distanceHours > 0) {
    return `${distanceHours} hour(s) ago`
  } else if (distanceMinutes > 0) {
    return `${distanceMinutes} minute(s) ago`
  } else {
    return `${distanceSecond} second(s) ago`
  }
}

function getProjectDuration(endDate, startDate) {
  const miliseconds = 1000
  const secondInMinute = 60
  const minuteInHour = 60
  const secondInHour = secondInMinute * minuteInHour // 3600
  const hourInDay = 24
  const dayInMonth = 30
  const monthInYear = 12
  const distance = endDate - startDate

  let distanceMonth =
    distance / (miliseconds * secondInHour * hourInDay * dayInMonth)
  let distanceDay = distance / (miliseconds * secondInHour * hourInDay)

  if (distanceMonth >= 12) {
    return `${Math.floor(distanceMonth / monthInYear)}` + ` Year`
  } else if (distanceDay >= 30) {
    return `${Math.floor(distanceDay / dayInMonth)}` + ' Month'
  } else {
    return `${Math.floor(distanceDay)}` + ' day'
  }
}

function renderCard() {
  let containerProject = document.getElementById('project')
  containerProject.innerHTML = ''

  for (let i = 0; i < projects.length; i++) {
    const startDateVariable = new Date(projects[i].startDate)
    const endDateVariable = new Date(projects[i].endDate)
    const duration = getProjectDuration(endDateVariable, startDateVariable)

    containerProject.innerHTML += `
      <div class='col' id='project'>
        <div class='card' id='card-project'>
          <img src="${projects[i].image}" class='card-img-top' />
          <div class='card-body'>
            <h5 class='card-title'><a href="detailProject.html?${
              projects[i].title
            }">${projects[i].title}</a></h5>
            <p class='card-text'>
              <small class='text-muted'>durasi : ${duration}</small>
            </p>
            <p class='card-text'>
              ${projects[i].description.substring(1, 150)}
            </p>
            <div class='icons'>
              ${
                projects[i].icon.nodeJs === true
                  ? '<i class="fa-brands fa-node-js"></i>'
                  : ''
              }
                ${
                  projects[i].icon.reactJs === true
                    ? '<i class="fa-brands fa-react"></i>'
                    : ''
                }
                ${
                  projects[i].icon.javaScript === true
                    ? '<i class="fa-brands fa-js"></i></i>'
                    : ''
                }
                ${
                  projects[i].icon.vueJs === true
                    ? '<i class="fa-brands fa-vuejs"></i>'
                    : ''
                }
            </div>
            <a href='#' class='btn btn-dark' id="edit">
              Edit
            </a>
            <a href='#' class='btn btn-dark' id="delete">
              delete
            </a>
          </div>
        </div>
      </div>

      `
  }
}

setInterval(function () {
  renderCard()
}, 3000)
