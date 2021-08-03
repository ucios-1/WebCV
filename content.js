const fireEvent = (event, element) => {
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent(event, true, true);
    element.dispatchEvent(evt);
};
const $ = (id) => {
    return document.getElementById(id);
};


//Tania
/*
var notAvailableUsers = {};
var storage = JSON.parse(localStorage.getItem('reservedUsers'));
*/
//end Tania

window.onload = () => {
    let style = document.createElement('style');
    style.innerHTML = `.x-tip-default {
        border-color: #8eaace;
        pointer-events: none;
    }`;
    document.head.appendChild(style);

    if (window.location.href.toLowerCase().includes('scheduler.xsp?group=mos')) {
        const SLACK_DB = getSlackIDs();
        setInterval(() => {
            let cells = document.getElementsByClassName('x-grid-cell-inner');           
            
            for(let cell of cells)  {
//Copy to Clipboard
                cell.onclick = (e) => {
                    const el = document.createElement("textarea");
                    el.value = cell.textContent;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand("copy");
                    document.body.removeChild(el);
                };

                if (SLACK_DB.hasOwnProperty(cell.textContent)) {
                    if (cell.childNodes.length === 1) {
                        //adds Slack icon and functionality
                        let slackIcon = document.createElement('img');
                        let iconUrl = chrome.extension.getURL('images/slack-16.png');
                        slackIcon.src = iconUrl;
                        slackIcon.alt = 'Slack reference';
                        slackIcon.onclick = (e) => {
                            let url = `slack://user?team=T1BV9RE2Y&id=${SLACK_DB[cell.textContent]}`;
                            window.open(url, '_blank');
                        };
                        slackIcon.style.cursor = 'pointer';
                        slackIcon.style.display = 'inline';
                        cell.insertBefore(slackIcon, cell.firstChild);


// Tania
/*
                        //adds checkbox and functionality
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
*/
//end Tania 
                    } else {
                        break;
                    }
                }
            }
        }, 5000);
    }
};

const getSlackIDs = () => {
  const CSV = 'Anastasia Maistrenko;WJU2WD9LL\n' +
      'Aleksandra Bakowska;WJWPAP554\n' +
      'Alena Varaksa;U01GDS6KK97\n' +
      'Alexandra Brutman;U01PVUJMJ8G\n' +
      'Alina Hladchenko;WJN86AHKK\n' +
      'Alina Kalabugina;U01LQJ2GMPU\n' +
      'Anastasiya Sergeeva;U01Q2H72R25\n' +
      'Andrei Varabei;WJH5AMS4T\n' +
      'Anna Birina;WJWD36HSB\n' +
      'Arina Tomash;U01SXSKHR9V\n' +
      'Artem Sozoniuk;WJUHBRGVB\n' +
      'Bohdana Antoniuk;WU6TMJ39P\n' +
      'Daria Babikova;U01NRAWESQ7\n' +
      'Daria Popichko;U01TJQRNZUL\n' +
      'Daria Volobueva;WMF8FF57X\n' +
      'Denis Buryi;U01TCS5D7TM\n' +
      'Denis Lunevsky;U01P6A7KS4T\n' +
      'Dmitry Antonov;U01NLBN7RMF\n' +
      'Dmytro Parkhomenko;WJU2V2L12\n' +
      'Ekaterina Starova;U022NPS9B8A\n' +
      'Evgeny Sadomov;U021VD066F6\n' +
      'Gordey Zikratskiy;U01P31NTBBP\n' +
      'Grigory Chernyaev;U01PVUJLTKJ\n' +
      'Halina Pushko;WT96ZV0RX\n' +
      'Ilia Orekhov;U01PPU59ND8\n' +
      'Illia Shliakhetko;WJN829EP3\n' +
      'Ilya Mikheenko;U01PPU55WV8\n' +
      'Inna Badzhurak;WJH5P1W1Y\n' +
      'Kate Klemeshova;U021PEFQGJX\n' +
      'Kate Sluzhenikina;U01QTPLLFNY\n' +
      'Kate Yarema;WJWP9CNTY\n' +
      'Kateryna Mykhalevska;WKY3VTM96\n' +
      'Kirill Luhovskyi;WJWDDE3MM\n' +
      'Liudmila Pavlenko;WJWP3PU94\n' +
      'Ludmila Gainatulina;WJUH44S0M\n' +
      'Maria Yashina;WJUH41T8V\n' +
      'Mila Shevchenko;WJU2ZU4N8\n' +
      'Natalia Burnyashova;WJUJGHE1E\n' +
      'Natalia Trembovetskaya;U021L5YDAJ1\n' +
      'Nickolay Ermakov-SPB;U01P956HJGP\n' +
      'Nikita Karetnikov;WJU2PG1V2\n' +
      'Nikolay Deev;WDGHFJBC6\n' +
      'Oksana Adarcewicz;WBE0BHTEX\n' +
      'Oleg Abrosimov;WJCHDCMSS\n' +
      'Oleksandr Kolisnichenko;WUKFVATUM\n' +
      'Oleksandr Sotnykov;WBQCH4G8M\n' +
      'Olena Karpenko;WJUH6V78V\n' +
      'Olena Yelistratova;WJUJC8UQG\n' +
      'Olga Gruszka;WJUJDJ9R6\n' +
      'Olga Spirina;WJUHAFTT7\n' +
      'Olga Toporishcheva;U021P884H8S\n' +
      'Rita Koktysheva;U01TCS5FLHH\n' +
      'Roman Degtyarev;U01N7NLDMQA\n' +
      'Roman Tanasienko;U022P0LLUD9\n' +
      'Sergey Shalamov;WJUH5AKJ9\n' +
      'Tatiana Kary-Niyazova;U01PC943NR2\n' +
      'Tatiana Kholosha;WT917KA0N\n' +
      'Timur Bekmurzin;WNW24QZGV\n' +
      'Varvara Dementeva;WJUJ5P6QY\n' +
      'Vasily Ryaguzov;U021L5YFML5\n' +
      'Vera Bilichenko;WJWD3RF5M\n' +
      'Vera Mertsalova;WJ9GZRM5J\n' +
      'Victoria Akuginova;U021VCZTXFE\n' +
      'Viktoriia Kuklasinska;WJUJFQGKA\n' +
      'Vladyslav Nebrat;WJH5ZE4R0\n' +
      'Vladyslav Vlasyuk;WKY44997F\n' +
      'Yana Mukhina;U01P647RPD0\n' +
      'Yurii Brzhezytskyi;WJWDETZ47\n' +
      //GEO-Support
      'Edyta Paterek;WJH58GFMH\n' +
      'Iryna Kaliuzhna;WR565FMC3\n' +
      'Katarzyna Jusiak;WJU2R0CEQ\n' +
      'Magda Michalak;WJU2X83EG\n' +
      'Magdalena Talarczyk;WJH5QVALA\n' +
      'Monika Jaworska;WJU2QH3CL\n' +
      'Pat Burzynska;WKLM7DL83\n' +
      'Patrycja Nykiel;WJWDB6X39\n' +
      //Moscow
      'Alina Barsegova;U024PE32VCK\n' +
      'Ilia Avksentev;U024PE2SWF5\n' +
      'Marina Gorshkova;U024GEBHVCN\n' +
      'Olga Ladogina;U027JEB2E9Y\n' +
      'Olga Popova;U024VCN9HEG\n' +
      //Piter
      'Kirill Kovalenko;U021PEG309Z\n' +
      'Maksim Matlin;U01T5SF2RKQ\n' +
      'Marina Livinets-SPBR;U021PEFT29Z\n' +
      'Mikhail Konovalov;U01U2E38C3S\n' +
      'Nikita Neuchev;U01TCEKTGCS\n' +
      'Petr Trofimov;U01N7NLFHS6\n' +
      'Sergey Olifir;U01PLRLMHV3\n' +
      //Costa-Rica
      'Hector Sebastian Morales Gutierrez;WMZH2J9A5\n' +
      'Mariana Chacon;WLRPBMA4D\n' +
      'Melissa Caravaca;WLR928F36\n' +
      'Francisco Alejandro Leal Tovar;WMULZSPEY';

    const rows = CSV.split('\n');
    let result = {};
    rows.forEach(row => {
        let rowData = row.split(';');
        result[rowData[0]] = rowData[1];
    });
    return result;
};