// This code adds new functions to existing page:
// 1. Add icon of Slack to a table cell if this cell meet the conditions
// 2. Add function which open direct message with particular Slack user
// 3. Create internal database and check mark field to allow user mark some cells and store information about marks after browser and computer reload

const fireEvent = (event, element) => {
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent(event, true, true);
    element.dispatchEvent(evt);
};
const $ = (id) => {
    return document.getElementById(id);
};

var notAvailableUsers = {};
var storage = JSON.parse(localStorage.getItem('reservedUsers'));

window.onload = () => {

    if (window.location.href.toLowerCase().includes(/* File name */)) {
        const SLACK_DB = getSlackIDs();
        setInterval(() => {
            let cells = document.getElementsByClassName(/* Class name */);           
            
            for(let cell of cells)  {
// Copy to Clipboard text from clicked field
// Start
                cell.onclick = (e) => {
                    const el = document.createElement("textarea");
                    el.value = cell.textContent;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand("copy");
                    document.body.removeChild(el);
                };
// End

                if (SLACK_DB.hasOwnProperty(cell.textContent)) {
                    if (cell.childNodes.length === 1) {
// Add Slack icon and functionality
                        let slackIcon = document.createElement('img');
                        let iconUrl = chrome.extension.getURL('images/slack-16.png');
                        slackIcon.src = iconUrl;
                        slackIcon.alt = 'Slack reference';
                        slackIcon.onclick = (e) => {
                            let url = `slack://user?team=`/* Slack workspace ID goes here */`&id=${SLACK_DB[cell.textContent]}`;
                            window.open(url, '_blank');
                        };
                        slackIcon.style.cursor = 'pointer';
                        slackIcon.style.display = 'inline';
                        cell.insertBefore(slackIcon, cell.firstChild);

// Add checkbox and functionality
                        let activeUser = document.createElement ('input');
                        activeUser.type = 'checkbox';
                        activeUser.classList.add('availability');
                        activeUser.style.cursor = 'pointer';
                        activeUser.id = cell.textContent.replace(/\s/g,'');
                        activeUser.name = cell.textContent;
                        if(storage != null){
                            let savedCheckbox = storage[activeUser.id];
                            if (savedCheckbox != null) {
                                activeUser.checked = 'true';
                            }
                        }
                        activeUser.onclick = (e) => {
                            notAvailableUsers = storage;
                            if (e.target.checked) {
                                notAvailableUsers[e.target.id] = {
                                  name: e.target.id,
                                  value: 'reserved'
                                };
                            } else {
                                delete notAvailableUsers[e.target.id];
                            }
                            localStorage.setItem('reservedUsers', JSON.stringify(notAvailableUsers));
                        };
                        cell.insertBefore(activeUser, cell.firstChild);
                    } else {
                        console.log("cell.childNodes.length not equal to  1");
                        break;
                    }
                }
            }
        }, 5000);
    }
};

const getSlackIDs = () => {
  const CSV = ''/*User name and surname*/';'/*Slack user ID*/'\n' +
      /* Example */'Mr Smith;AAAAAA000\n' +
      .
      .
      .
      /* Example */'Mrs Smith;BBBBBB111\n';

    const rows = CSV.split('\n');
    let result = {};
    rows.forEach(row => {
        let rowData = row.split(';');
        result[rowData[0]] = rowData[1];
    });
    return result;
};
