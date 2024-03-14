

function changeScore(selectID, score, mod) {
    var e = document.getElementById(selectID);
    var value = e.value;
    var stat = value + "Score";
    var x = document.getElementById(stat);
    x.textContent = score;

    if (typeof mod === "undefined")
    {
        changeMod(value);
    }
    else
    {
        var modText = document.getElementById(value + "Mod");
        modText.textContent = mod;
    }
}

function changeMod(stat) {
    var e = document.getElementById(stat + "Score");
    var text = e.innerText;
    var value = parseInt(text);
    var mod;
    if (value == 3) {mod = -2}
    else if (value >= 4 && value <= 7) {mod = -1}
    else if (value >= 8 && value <= 13) {mod = 0}
    else if (value >= 14 && value <= 17) {mod = 1}
    else {mod = 2};

    document.getElementById(stat + "Mod").textContent = mod;
}

const attributes = ["str", "dex", "con", "int", "wis", "cha"];
var tries = 0;

function randomize()
{
    if (tries >= 3)
    {
        return;
    }
    else
    {
        for (let i = 0; i < 6; i++)
        {
            var e = document.getElementById(attributes[i] + "Score");
            e.textContent = Math.floor(Math.random() * (18 - 3 + 1)) + 3;
            changeMod(attributes[i]);
        }
        tries++;
    }
}

function showAttributeOption(id)
{
    var x = document.getElementById("randomSelection");
    var y = document.getElementById("arraySelection");
    if (id == "randomSelection")
    {
        x.style.display = "block";
        y.style.display = "none";
    }
    else
    {
        y.style.display = "block";
        x.style.display = "none";
    }
}

async function showBackgroundDesc(name)
{
    document.getElementById('backgroundDesc').style.display = 'block';

    let obj;
    const res = await fetch('./json/backgrounds.json')
    obj = await res.json();
    
    var e = document.getElementById(name);
    var x = e.value;

    var y = document.getElementById('backgroundDesc');
    y.textContent = obj[x].description;

    var learning1 = obj[x].learning[0];
    var learning2 = obj[x].learning[1];
    var learning3 = obj[x].learning[2];
    var learning4 = obj[x].learning[3];
    var learning5 = obj[x].learning[4];
    var learning6 = obj[x].learning[5];
    var learning7 = obj[x].learning[6];
    var learning8 = obj[x].learning[7];

    document.getElementById("optLearningChoice1").style.display = "none";
    document.getElementById("optLearningChoice2").style.display = "none";
    // Delete any choices in skills from the selectors
    deleteSkill("learningChoice1");
    deleteSkill("learningChoice2");
    deleteSkill("optLearningChoice1");
    deleteSkill("optLearningChoice2");

    // Clear bgAnyChoice from screen and selection
    document.getElementById('bgAnyChoice').innerHTML = "<option selected></option>";
    document.getElementById('bgAnyChoice').style.display = 'none';
    deleteSkill('bgAnyChoice');

    // Add free skill to the table and add to the skill dictionary
    document.getElementById('freeSkill').innerHTML = "<option selected>" + obj[x].free_skill + "</option>";
    updateSkills('freeSkill');
    if (document.getElementById('freeSkill').value == 'Any Combat')
    {
        document.getElementById('bgAnyChoice').style.display = 'block';
        checkChoice('freeSkill', 'bgAnyChoice');
    }

    document.getElementById('learning1').textContent = learning1;
    document.getElementById('learning2').textContent = learning2;
    document.getElementById('learning3').textContent = learning3;
    document.getElementById('learning4').textContent = learning4;
    document.getElementById('learning5').textContent = learning5;
    document.getElementById('learning6').textContent = learning6;
    document.getElementById('learning7').textContent = learning7;
    document.getElementById('learning8').textContent = learning8;

    const array1 = [learning1, learning2, learning3, learning4, learning5, learning6, learning7, learning8];
    var choiceSelect1 = document.getElementById('learningChoice1');
    var choiceSelect2 = document.getElementById('learningChoice2');
    

    insertChoices(array1, choiceSelect1);
    insertChoices(array1, choiceSelect2);

    document.getElementById('c_background').textContent = obj[x].name;
    document.getElementById('skillChoiceDiv').style.display = 'grid';
}

function insertChoices(array, choiceSelect)
{
    // Clear options
    choiceSelect.innerHTML = "";

    array.forEach((item) => {
        var opt = document.createElement('option');
        opt.value = item;
        opt.innerHTML = item;
        choiceSelect.appendChild(opt);
    });

    // Set selected option as an empty choice
    var opt = document.createElement('option');
    opt.selected = true;
    opt.hidden = true;
    choiceSelect.appendChild(opt);
}

function checkChoice(select, select2)
{
    const combatSkills = ['Punch', 'Shoot', 'Stab'];
    const allSkills = ['Administer', 'Connect', 'Drive', 'Exert', 'Fix', 'Heal', 'Know', 'Lead', 'Notice', 'Perform', 'Program', 'Punch',
                        'Shoot', 'Sneak', 'Stab', 'Survive', 'Talk', 'Trade', 'Work'];
    const nonCombatSkills = ['Administer', 'Connect', 'Drive', 'Exert', 'Fix', 'Heal', 'Know', 'Lead', 'Notice', 'Perform', 'Program',
                                'Sneak', 'Survive', 'Talk', 'Trade', 'Work'];
    
    // x is the selector that will have either 'Any Combat' or 'Any Skill'
    var x = document.getElementById(select);
    // y is the selector that will be populated with each skill
    var y = document.getElementById(select2);
    // Check value of x
    if (x.value == 'Any Combat')
    {
        // Delete skill with key matching select
        deleteSkill(select);
        // Clear y
        y.innerHTML = "<option selected hidden></option>";
        // Iterate through combatSkills and populate y with content
        combatSkills.forEach((item) => {
            var opt = document.createElement('option');
            opt.value = item;
            opt.innerHTML = item;
            y.appendChild(opt);
        });
        y.style.display = 'block';
    }
    else if (x.value == 'Any Skill')
    {
        // Delete skill with key matching select
        deleteSkill(select);
        // Clear y
        y.innerHTML = "<option selected hidden></option>";
        // Iterate through allSkills and populate y with content
        allSkills.forEach((item) => {
            var opt = document.createElement('option');
            opt.value = item;
            opt.innerHTML = item;
            y.appendChild(opt);
        });
        y.style.display = 'block';
    }
    else if (x.value == 'Non-combat Skill')
    {
        deleteSkill(select);
        y.innerHTML = "<option selected hidden></option>";

        nonCombatSkills.forEach((item) => {
            var opt = document.createElement('option');
            opt.value = item;
            opt.innerHTML = item;
            y.appendChild(opt);
        });
        y.style.display = 'block';
    }
    // if x.value is neither 'Any Combat' or 'Any Skill'
    else
    {
        // Delete skill with key matching select2
        deleteSkill(select2);
        // Clear y innerHTML
        y.innerHTML = "<option selected hidden></option>";

        // Hide y, and set value to none
        y.style.display = 'none';
        y.value = "";
    }
}

// Gonna need similar functions for the Edges, and the probably the foci. I might be able to generalize them eventually
// As of this moment though, I am not proficient enough in JavaScript, nor are they made so I can process them
// Also gotta incorporate the skills functionality eventually, still avoiding it though.

async function showEdgeDescription(select, select2, select3, desc, extraDiv, prodigyChoice)
{
    let obj;
    const res = await fetch('./json/edges.json')
    obj = await res.json();
    
    var e = document.getElementById(select);
    var x = e.value;

    var y = document.getElementById(desc);
    y.style.display = 'block';
    y.textContent = obj[x].description;

    // Delete skills from this section on change
    deleteSkill(select2);
    deleteSkill(select3);

    // Prodigy edge case, display if it is an option
    if (x == 'prodigy')
    {
        document.getElementById(prodigyChoice).style.display = 'grid';
    }
    else
    {
        document.getElementById(prodigyChoice).style.display = 'none';
    }

    var y;
    if (select == 'edgeSelection1')
    {
        y = document.getElementById('edgeSelection2').value;
    }
    else
    {
        y = document.getElementById('edgeSelection1').value;
    }

    // Focused edge case, display second focus selection if selected
    if (x == 'focused' && y != 'focused')
    {
        document.getElementById('secondFocusDiv').style.display = 'block';
    }
    // Second div needs to be shown but not the third
    else if (x != 'focused' && y == 'focused')
    {
        deleteSkill('focusSkill3');
        deleteSkill('optFocusSkill3');
        document.getElementById('secondFocusDiv').style.display = 'block';
        document.getElementById('thirdFocusDiv').style.display = 'none';

        // Hide elements of thirdFocusDiv
        var optionSelect = document.createElement('option');
        optionSelect.selected = true;
        optionSelect.hidden = true;
        document.getElementById('focusChoice3').appendChild(optionSelect);
        document.getElementById('focusDesc3').textContent = '';
        document.getElementById('focusLevelDesc3').textContent = '';
        document.getElementById('focusSkill3').appendChild(optionSelect);

    }
    else if (x == 'focused' && y == 'focused')
    {
        document.getElementById('secondFocusDiv').style.display = 'block';
        document.getElementById('thirdFocusDiv').style.display = 'block';
    }
    // If neither option is focused now, delete skills and hide it
    else
    {
        deleteSkill('focusSkill2');
        deleteSkill('optFocusSkill2');
        deleteSkill('focusSkill3');
        deleteSkill('optFocusSkill3');
        document.getElementById('secondFocusDiv').style.display = 'none';
        document.getElementById('thirdFocusDiv').style.display = 'none';
    }

    // Voice of the People edge case
    if (x == 'voice_of_the_people')
    {
        voicePeople();
    }
    else if (x != 'voice_of_the_people' && y != 'voice_of_the_people')
    {
        deleteSkill('popSkill');
        document.getElementById('voicePeople').style.display = 'none';
    }

    // If extra skill choice is an option
    if (obj[x].extra_skill != "")
    {
        // Display options
        document.getElementById(extraDiv).style.display = "grid";
        document.getElementById(select2).innerHTML = "<option selected>" + obj[x].extra_skill + "</option>";
        document.getElementById(select2).value = obj[x].extra_skill;

        // If it needs a sub choice
        if (obj[x].extra_skill == "Any Combat")
        {
            document.getElementById(select2).value = 'Any Combat'
        }
        else if (obj[x].extra_skill == "Any Skill")
        {
            document.getElementById(select2).value = 'Any Skill'
        }
        // Check options
        checkChoice(select2, select3);
        updateSkills(select2);
    }
    // Otherwise display nothing but description
    else 
    {
        document.getElementById(extraDiv).style.display = "none";
        document.getElementById(select2).innerHTML = "";
        document.getElementById(select2).value = "";

    }
}

function testFunction(id)
{
    console.log(document.body.contains(document.getElementById('weapon_0')));
}

// Function to updateSkills to a pseudo-dictionary
// key : value;
var selectedSkills = {};

function updateSkills(id, value)
{
   if (typeof value != "undefined")
   {
        deleteSkill(id);
        selectedSkills[id] = value;
        applySkills();
        return;
   }
   
   
    // selectedSkills will match pattern of : 'select element' : 'skill selected'
    deleteSkill(id);

    // Add new key : value pair to the dictionary
    var select = document.getElementById(id);
    if (select.value == 'Any Combat' || select.value == 'Any Skill')
    {
        return;
    }
    else
    {
        selectedSkills[id] = select.value;
    }

    applySkills();
}

function deleteSkill(id)
{
    // Delete option from selectedSkills dictionary
    for (var key in selectedSkills)
    {
        if (key == id)
        {
            delete selectedSkills[key];
            break;
        }
    }
}

async function showFocusDescription(select, descDiv, levelDesc, focusSelect, optFocusSkill, select2, select3)
{
    let obj;
    const res = await fetch('./json/foci.json')
    obj = await res.json();
    
    // If last two parameters are not passed, it is the FIRST Focus selection
    if (typeof select2 === "undefined" && typeof select3 === "undefined")
    {
        // e is the edge selector, x is the value
        var e = document.getElementById(select);
        var x = e.value;

        // y is the description div
        var y = document.getElementById(descDiv);
        y.parentElement.style.display = 'block';
        y.textContent = obj[x].desc;

        // Gonna need some kind of check to see if the focus has already been selected, could just check the value of edge selection
        // If either is 'Focused' then I need to do the check, otherwise not at all.

        // Probably tie this into the edge description function, if Focused is chosen then display the second Focus select

        // Delete existing skills for the case where the level skill is an 'and' or 'or' option
        deleteSkill(focusSelect);
        deleteSkill(optFocusSkill);
        deleteSkill(optFocusSkill + '_2');


        // Show level description
        var levelInfo = document.getElementById(levelDesc);
        levelInfo.parentElement.style.display = 'block';
        levelInfo.textContent = obj[x].level_1;
        levelInfo.style.display = 'block';

        var focusSkill = document.getElementById(focusSelect);
        focusSkill.innerHTML = "";

        document.getElementById(optFocusSkill).parentElement.style.display = 'none';

        if (obj[x].level_1_skill != '')
        {
            focusSkill.parentElement.style.display = 'block';
            focusSkill.innerHTML = "<option selected>" + obj[x].level_1_skill + "</option>"
        
            if (!obj[x].level_1_skill.includes(' '))
            {
                focusSkill.value = obj[x].level_1_skill;
                updateSkills(focusSelect);
            }

        

            if (obj[x].level_1_skill.includes(' or '))
            {
                document.getElementById(optFocusSkill).parentElement.style.display = 'block';
                var stringSplit = obj[x].level_1_skill.split(" ");
                var stringArray = [stringSplit[0], stringSplit[2]];
                insertChoices(stringArray, document.getElementById(optFocusSkill));

            }
            else if (obj[x].level_1_skill.includes('and'))
            {
                document.getElementById(optFocusSkill).style.display = 'block';
                var stringSplit = obj[x].level_1_skill.split(" ");
                var stringArray = [stringSplit[0], stringSplit[2]];
                
                var string2 = optFocusSkill + '_2';

                updateSkills(optFocusSkill, stringArray[0]);
                updateSkills(string2, stringArray[1]);
            }
            else if (obj[x].level_1_skill.includes('Skill') || obj[x].level_1_skill.includes('Any'))
            {
                document.getElementById(optFocusSkill).parentElement.style.display = 'block';
                checkChoice(focusSelect, optFocusSkill);
            }
        }
        else
        {   
            focusSkill.parentElement.style.display = 'none';
        }
    }
    // If select3 is undefined, but select 2 is defined it is the SECOND focus choice
    else if (typeof select3 === "undefined" && typeof select2 != "undefined")
    {
        // e is the edge selector, x is the value
        var e = document.getElementById(select);
        var x = e.value;

        var z = document.getElementById(select2);
        var zy = z.value;

        // if they are same, display second level shit
        if (x == zy) 
        {
            if (obj[x].level_2 == "")
            {
                alert("There is no level 2 for this focus, please select another.");
                return;
            }
            
            // e is the edge selector, x is the value
            var e = document.getElementById(select);
            var x = e.value;

            // y is the description div
            // Don't need to display description
            //var y = document.getElementById(descDiv);
            //y.parentElement.style.display = 'block';
            //y.textContent = obj[x].desc;

            // Delete existing skills for the case where the level skill is an 'and' or 'or' option and more
            deleteSkill(focusSelect);
            deleteSkill(optFocusSkill);
            deleteSkill(optFocusSkill + "_2");

            // Show level description
            var levelInfo = document.getElementById(levelDesc);
            levelInfo.parentElement.style.display = "block";
            levelInfo.textContent = obj[x].level_2;
            levelInfo.style.display = "block";

            var focusSkill = document.getElementById(focusSelect);
            focusSkill.innerHTML = "";

            document.getElementById(optFocusSkill).parentElement.style.display = "none";
            // Need to copy the if statements from above still
            // There is a level 2 skill to be displayed
            if (obj[x].level_2_skill != "")
            {
                focusSkill.parentElement.style.display = 'block';
                focusSkill.innerHTML = "<option selected>" + obj[x].level_2_skill + "</option>"
                updateSkills(focusSelect);
            }
        }
        // They are not the same, display normally; first level and description
        else 
        {
            // e is the edge selector, x is the value
            var e = document.getElementById(select);
            var x = e.value;

            // y is the description div
            var y = document.getElementById(descDiv);
            y.parentElement.style.display = 'block';
            y.style.display = 'block';
            y.textContent = obj[x].desc;

            // Delete existing skills for the case where the level skill is an 'and' or 'or' option and more
            deleteSkill(focusSelect);
            deleteSkill(optFocusSkill);
            deleteSkill(optFocusSkill + "_2");

            // Show level description
            var levelInfo = document.getElementById(levelDesc);
            levelInfo.parentElement.style.display = "block";
            levelInfo.textContent = obj[x].level_1;
            levelInfo.style.display = "block";

            var focusSkill = document.getElementById(focusSelect);
            focusSkill.innerHTML = "";

            document.getElementById(optFocusSkill).parentElement.style.display = "none";
            // Need to copy the if statements from above still

            if (obj[x].level_1_skill != '')
            {
                focusSkill.parentElement.style.display = 'block';
                focusSkill.innerHTML = "<option selected>" + obj[x].level_1_skill + "</option>"
        
                if (!obj[x].level_1_skill.includes(' '))
                {
                    focusSkill.value = obj[x].level_1_skill;
                    updateSkills(focusSelect);
                }

                if (obj[x].level_1_skill.includes('or'))
                {
                    document.getElementById(optFocusSkill).parentElement.style.display = 'block';
                    var stringSplit = obj[x].level_1_skill.split(" ");
                    var stringArray = [stringSplit[0], stringSplit[2]];
                    insertChoices(stringArray, document.getElementById(optFocusSkill));
                }
                else if (obj[x].level_1_skill.includes('and'))
                {
                    document.getElementById(optFocusSkill).style.display = 'block';
                    var stringSplit = obj[x].level_1_skill.split(" ");
                    var stringArray = [stringSplit[0], stringSplit[2]];

                    var string2 = optFocusSkill + '_2';
                    // selectedSkills[optFocusSkill] = stringArray[0];
                    // selectedSkills[string2] = stringArray[1]; 

                    updateSkills(optFocusSkill, stringArray[0]);
                    updateSkills(string2, stringArray[1]);
                }
                else if (obj[x].level_1_skill.includes('Skill') || obj[x].level_1_skill.includes('Any'))
                {
                    document.getElementById(optFocusSkill).parentElement.style.display = 'block';
                    checkChoice(focusSelect, optFocusSkill);
                }
            }
            else
            {
                focusSkill.parentElement.style.display = 'none';
            }
        }
    }
    // select2 and select3 are defined, so it is the THIRD focus choice
    else
    {
        // e is the edge selector, x is the value
        var e = document.getElementById(select);
        var x = e.value;

        // Focus choice 2 value
        var y = document.getElementById(select2);
        var yz = y.value;

        // Focus choice 3 value
        var z = document.getElementById(select3);
        var zz = z.value;

        // Delete skills
        deleteSkill(focusSelect);
        deleteSkill(optFocusSkill);
        deleteSkill(optFocusSkill + "_2");
    
        // If this focus is the same as the first or second AND first and second != each other
        if (x == yz || x == zz && yz != zz)
        {
            if (obj[x].level_2 == "")
            {
                alert("There is no level 2 for this focus, please select another.");
                return;
            }

            // show level 2 description
            var levelInfo = document.getElementById(levelDesc);
            levelInfo.parentElement.style.display = "block";
            levelInfo.textContent = obj[x].level_2;
            levelInfo.style.display = "block";

            var focusSkill = document.getElementById(focusSelect);
            focusSkill.innerHTML = "";

            document.getElementById(optFocusSkill).parentElement.style.display = "none";
            // Need to copy the if statements from above still
            // There is a level 2 skill to be displayed
            if (obj[x].level_2_skill != "")
            {
                focusSkill.parentElement.style.display = 'block';
                focusSkill.innerHTML = "<option selected>" + obj[x].level_2_skill + "</option>"
                updateSkills(focusSelect);
            }
        }
        // This Focus is unique, show level and description
        else
        {
             // e is the edge selector, x is the value
             var e = document.getElementById(select);
             var x = e.value;
 
             // y is the description div
             var y = document.getElementById(descDiv);
             y.parentElement.style.display = 'block';
             y.textContent = obj[x].desc;
 
             // Delete existing skills for the case where the level skill is an 'and' or 'or' option and more
             deleteSkill(focusSelect);
             deleteSkill(optFocusSkill);
             deleteSkill(optFocusSkill + "_2");
 
             // Show level description
             var levelInfo = document.getElementById(levelDesc);
             levelInfo.parentElement.style.display = "block";
             levelInfo.textContent = obj[x].level_1;
             levelInfo.style.display = "block";
 
             var focusSkill = document.getElementById(focusSelect);
             focusSkill.innerHTML = "";
 
             document.getElementById(optFocusSkill).parentElement.style.display = "none";
             // Need to copy the if statements from above still
 
             if (obj[x].level_1_skill != '')
             {
                 focusSkill.parentElement.style.display = 'block';
                 focusSkill.innerHTML = "<option selected>" + obj[x].level_1_skill + "</option>"
         
                 if (!obj[x].level_1_skill.includes(' '))
                 {
                     focusSkill.value = obj[x].level_1_skill;
                     updateSkills(focusSelect);
                 }
 
                 if (obj[x].level_1_skill.includes('or'))
                 {
                     document.getElementById(optFocusSkill).parentElement.style.display = 'block';
                     var stringSplit = obj[x].level_1_skill.split(" ");
                     var stringArray = [stringSplit[0], stringSplit[2]];
                     insertChoices(stringArray, document.getElementById(optFocusSkill));
                 }
                 else if (obj[x].level_1_skill.includes('and'))
                 {
                     document.getElementById(optFocusSkill).style.display = 'block';
                     var stringSplit = obj[x].level_1_skill.split(" ");
                     var stringArray = [stringSplit[0], stringSplit[2]];
 
                     var string2 = optFocusSkill + '_2';
                     // selectedSkills[optFocusSkill] = stringArray[0];
                     // selectedSkills[string2] = stringArray[1]; 
 
                     updateSkills(optFocusSkill, stringArray[0]);
                     updateSkills(string2, stringArray[1]);
                 }
                 else if (obj[x].level_1_skill.includes('Skill') || obj[x].level_1_skill.includes('Any'))
                 {
                     document.getElementById(optFocusSkill).parentElement.style.display = 'block';
                     checkChoice(focusSelect, optFocusSkill);
                 }
             }
             else
             {
                 focusSkill.parentElement.style.display = 'none';
             }
        }
    }
}

async function voicePeople()
{
    let obj;
    const res = await fetch('./json/foci.json')
    obj = await res.json();

    // Get description
    var focusDesc = document.createElement("div");
    focusDesc.style = "border: 1px solid black; height: fit-content; background-color:#F0F0F0;";
    focusDesc.id = 'popDesc';
    focusDesc.textContent = obj['pop_idol'].desc;

    // Get Level-1 Desc
    var level1Desc = document.createElement("div");
    level1Desc.style = "border: 1px solid black; height: fit-content; background-color:#F0F0F0;";
    level1Desc.textContent = obj['pop_idol'].level_1;

    // Get Level-2 Desc
    var level2Desc = document.createElement("div");
    level2Desc.style = "border: 1px solid black; height: fit-content; background-color:#F0F0F0;";
    level2Desc.textContent = obj['pop_idol'].level_2;

    // Get Skill Div, Label, and Select
    var skillDiv = document.createElement('div');
    skillDiv.style = "display: grid; grid-template-columns: 95px 130px;";
    
    var skillLabel = document.createElement('label');
    skillLabel.innerHTML = '<b>Focus Skill:</b>'

    var popSkill = document.createElement("select");
    popSkill.classList.add('disabledSelect');
    popSkill.disabled = true;
    popSkill.id = 'popSkill';
    popSkill.style = 'width: 130px; height: 21px;'
    popSkill.innerHTML = '<option selected value=\'Perform\'>Perform</option>'

    skillDiv.appendChild(skillLabel);
    skillDiv.appendChild(popSkill);

    // Create Labels
    var popLabel = document.createElement('p');
    popLabel.innerHTML = '<b>Pop Idol Focus Info:</b>';
    popLabel.style.marginBottom = '0px';

    var descLabel = document.createElement("p");
    descLabel.style.marginBottom = '5px';
    descLabel.innerHTML = '<b>Description:</b>'

    var levelLabel = document.createElement("p");
    levelLabel.style.marginBottom = '5px';
    levelLabel.innerHTML = '<b>Focus Levels:</b>';

    // Append elements to whole div
    var wholeDiv = document.getElementById('voicePeople');
    wholeDiv.appendChild(popLabel);
    wholeDiv.appendChild(descLabel);
    wholeDiv.appendChild(focusDesc);
    wholeDiv.appendChild(levelLabel);
    wholeDiv.appendChild(level1Desc);
    wholeDiv.appendChild(level2Desc);
    wholeDiv.appendChild(skillDiv);
    wholeDiv.style.display = 'grid';

    // Call updateSkills method
    updateSkills('popSkill');
}

function applySkills()
{
    /*
        Going to have to iterate through selectedSkills[] and turn it into an array
    */

    var skillLevels = {'Administer':-1, 'Connect':-1, 'Drive':-1, 'Exert':-1, 'Fix':-1, 'Heal':-1, 'Know':-1, 'Lead':-1, 'Notice':-1, 
        'Perform':-1, 'Program':-1, 'Punch':-1, 'Shoot':-1, 'Sneak':-1, 'Stab':-1, 'Survive':-1, 'Talk':-1, 'Trade':-1, 'Work':-1};
    
    // Reset the check boxes
    for (var key in skillLevels)
    {
        for (i = 0; i < 5; i++)
        {
            document.getElementById(key.toLowerCase() + "_" + i).checked = false;
        }
    }
    
    
    // Convert dictionary to array
    var skillArray = []; 
    for (var key in selectedSkills)
    {
        skillArray.push(selectedSkills[key]);
    }
    
    // Use array to update dictionary
    for (i = 0; i < skillArray.length; i++)
    {
        skillLevels[skillArray[i]]++;
    }

    for (var key in skillLevels)
    {
        if (skillLevels[key] == -1)
        {
            document.getElementById(key.toLowerCase() + "Mod").textContent = '';
            continue;
        }

        if (skillLevels[key] > 1)
        {
            alert(key + " has too many levels, only 2 levels can be chosen per skill (Level 1).");
        }

        // update skill labels
        for (i = 0; i < skillLevels[key] + 1; i++)
        {
            document.getElementById(key.toLowerCase() + "_" + i).checked = true;
            
        }
        // update the mod label
        document.getElementById(key.toLowerCase() + "Mod").textContent = skillLevels[key];
        
    }
}

const skills = ['Administer', 'Perform', 'Work', 'Connect', 'Program', '', 'Drive', 'Punch', '', 'Exert', 'Shoot', '', 'Fix', 'Sneak',
                '', 'Heal', 'Stab', '', 'Know', 'Survive', '', 'Lead', 'Talk', '', 'Notice', 'Trade', '']

function generateSkillBoxes()
{
    for (i = 0; i < skills.length; i++)
    {
        // If current skills[i] = '' place empty divs
        if (skills[i] == '')
        {
            let skillBlockDiv = document.createElement('div');
            skillBlockDiv.classList.add('skillBlock');
            // Create empty divs
            skillBlockDiv.appendChild(document.createElement('div'));
            skillBlockDiv.appendChild(document.createElement('div'));
            skillBlockDiv.appendChild(document.createElement('div'));
            // append empty skillBlockDiv to skillTable
            document.getElementById('skillTable').appendChild(skillBlockDiv);
            continue;
        }
        
        // Create overall div for skillBlock
        let skillBlockDiv = document.createElement('div');
        skillBlockDiv.classList.add('skillBlock');

        // Create div for title
        let titleDiv = document.createElement('div');
        let titleSpan = document.createElement('span');
        titleSpan.textContent = skills[i];
        titleDiv.appendChild(titleSpan);
        skillBlockDiv.appendChild(titleDiv);

        // Create div holding input
        let inputDiv = document.createElement('div');
        inputDiv.style.display = 'grid';
        inputDiv.style.gridTemplateColumns = '20% 20% 20% 20% 20%';

        // Create labels
        for (j = 0; j < 5; j++)
        {
            // Create label that will hold input
            let inputLabel = document.createElement('label');
            inputLabel.classList.add('checkbox-label');
            // Create input
            let input = document.createElement('input');
            input.type = 'checkbox';
            input.setAttribute("onchange", 'inputAlert(this.id)');
            input.id = skills[i].toLowerCase() + "_" + j;
            // Append input to label, and label to div
            inputLabel.appendChild(input);
            inputDiv.appendChild(inputLabel);
        }

        // Append inputDiv and empty div to skillBlockDiv
        skillBlockDiv.appendChild(inputDiv);
        let modDiv = document.createElement('div');
        modDiv.id = skills[i].toLowerCase() + "Mod";
        skillBlockDiv.appendChild(modDiv);

        // Append div to skill table
        document.getElementById('skillTable').appendChild(skillBlockDiv);

    }
}

function calculateHP()
{
    var edge1 = document.getElementById('edgeSelection1');
    var edge2 = document.getElementById('edgeSelection2');

    var hp;
    var conMod = parseInt(document.getElementById('conMod').textContent);
    if (edge1.value == 'hard_to_kill' || edge2.value == 'hard_to_kill')
    {
        hp = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        hpSum = hp + conMod + 2;
        document.getElementById('hdCalc').textContent = ' ' + hp + ' (1d6) + ' + conMod + " (CON mod) + 2 (Hard to Kill) : " + hpSum;
        
    }
    else
    {
        hp = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        hpSum = hp + conMod;
        document.getElementById('hdCalc').textContent = ' ' + hp + ' (1d6) + ' + conMod + " (CON mod) : " + hpSum;
    }

    document.getElementById('hitDice').style.display = 'grid';
    document.getElementById('hpTotal').textContent = hpSum;
}

function calculateSaves()
{
    var calcString = '';

    // Calculate Physical Save
    var phySave = 15;
    var strMod = parseInt(document.getElementById('strMod').textContent);
    var conMod = parseInt(document.getElementById('conMod').textContent);

    if (strMod >= conMod)
    {
        phySave = phySave - strMod;
        calcString = '<b>Physical Save:</b> ' + phySave + ' (15 - STR) ';
    }
    else
    {
        phySave = phySave - conMod;
        calcString = '<b>Physical Save:</b> ' + phySave + ' (15 - CON) ';
    }

    // Calculate Evasion Save
    var evaSave = 15;
    var dexMod = parseInt(document.getElementById('dexMod').textContent);
    var intMod = parseInt(document.getElementById('intMod').textContent);

    if (dexMod >= intMod)
    {
        evaSave = evaSave - dexMod;
        calcString = calcString + ' <b>Evasion Save:</b> ' + evaSave + ' (15 - DEX) ';
    }
    else
    {
        evaSave = evaSave - intMod;
        calcString = calcString + ' <b>Evasion Save:</b> ' + evaSave + ' (15 - INT) ';
    }

    // Calculate Mental Save
    var menSave = 15;
    var wisMod = parseInt(document.getElementById('wisMod').textContent);
    var chaMod = parseInt(document.getElementById('chaMod').textContent);

    if (wisMod >= chaMod)
    {
        menSave = menSave - wisMod;
        calcString = calcString + ' <b>Mental Save:</b> ' + menSave + ' (15 - WIS)';
    }
    else
    {
        menSave = menSave - chaMod;
        calcString = calcString + '<b>Mental Save:</b> ' + menSave + ' (15 - CHA)';
    }

    // Apply calculations to page
    document.getElementById('phySave').textContent = phySave;
    document.getElementById('evaSave').textContent = evaSave;
    document.getElementById('menSave').textContent = menSave;
    document.getElementById('saveCalc').innerHTML = calcString;

    document.getElementById('saves').style.display = 'grid';
    
}

function calculateAttack()
{
    var edge1 = document.getElementById('edgeSelection1');
    var edge2 = document.getElementById('edgeSelection2');

    var atkBonus = 0;
    if (edge1.value == 'on_target' || edge2.value == 'on_target')
    {
        atkBonus = 1;
    }

    document.getElementById('atkCalc').textContent = atkBonus;
    document.getElementById('atkBonus').style.display = 'grid';
}

function inputAlert(id)
{
    document.getElementById(id).checked = false;
    alert('Do not select skills through the boxes. Instead go through the creation steps.');
}

const skillsPDF = ['administer', 'connect', 'drive', 'exert', 'fix', 'heal', 'know', 'lead', 'notice', 'perform', 'program', 'punch', 'shoot', 'sneak', 'stab', 'survive', 'talk', 'trade', 'work'];


async function fillOutCharacterSheet()
{
    const formUrl = "./CWN_Character_Sheet.pdf";
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

    const pdfDoc = await PDFLib.PDFDocument.load(formPdfBytes);

    const form = pdfDoc.getForm();

    // Name, Background, Level fields
    const nameField = form.getTextField('Name');
    const backgroundField = form.getTextField('Background');
    const levelField = form.getTextField('Level');
    nameField.setText(document.getElementById('c_name').value);
    backgroundField.setText(document.getElementById('c_background').textContent);
    levelField.setText('1');

    // Skill Level Fields and Values
    for (var skill of skillsPDF)
    {
        var skillLevel = document.getElementById(skill + "Mod").textContent;
        if (skillLevel == '')
        {
            skillLevel = "-1";
        }

        if (skill == 'administer')
        {
            form.getTextField('AdminLvl').setText(skillLevel);
        }
        else
        {
            form.getTextField(capitalFirst(skill) + "Lvl").setText(skillLevel);
        }
    }

    // Edges
    form.getTextField('First Edge').setText(selectText('edgeSelection1'));
    form.getTextField('Second Edge').setText(selectText('edgeSelection2'));

    // Attack Bonus, HP, Saving Throws
    form.getTextField('AB').setText(document.getElementById('atkCalc').textContent);
    form.getTextField('MaxHP').setText(document.getElementById('hpTotal').textContent);
    form.getTextField('PSave').setText(document.getElementById('phySave').textContent);
    form.getTextField('ESave').setText(document.getElementById('evaSave').textContent);
    form.getTextField('MSave').setText(document.getElementById('menSave').textContent);
    form.getTextField('LSave').setText('15');

    // Attribute Scores and Modifiers
    form.getTextField('Str').setText(document.getElementById('strScore').textContent);
    form.getDropdown('StrMod').select(document.getElementById('strMod').textContent);
    form.getTextField('Dex').setText(document.getElementById('dexScore').textContent);
    form.getDropdown('DexMod').select(document.getElementById('dexMod').textContent);
    form.getTextField('Con').setText(document.getElementById('conScore').textContent);
    form.getDropdown('ConMod').select(document.getElementById('conMod').textContent);
    form.getTextField('Int').setText(document.getElementById('intScore').textContent);
    form.getDropdown('IntMod').select(document.getElementById('intMod').textContent);
    form.getTextField('Wis').setText(document.getElementById('wisScore').textContent);
    form.getDropdown('WisMod').select(document.getElementById('wisMod').textContent);
    form.getTextField('Cha').setText(document.getElementById('chaScore').textContent);
    form.getDropdown('ChaMod').select(document.getElementById('chaMod').textContent);
    
    // Foci Details and Level
    var firstEdge = form.getTextField('First Edge').getText();
    var secondEdge = form.getTextField('Second Edge').getText();
    
    var foci1 = selectText('focusChoice');
    var foci1_lvl;
    var foci1_desc;

    // min num Foci = 2
    if (firstEdge == 'Focused' || secondEdge == 'Focused')
    {
        var foci2 = selectText('focusChoice2');
        var foci2_lvl;
        var foci2_desc;
        // min num Foci = 3
        if (firstEdge == 'Focused' && secondEdge == 'Focused')
        {
            var foci3 = selectText('focusChoice3');
            var foci3_lvl;
            var foci3_desc;

            // Foci1 == Foci2
            if (foci1 == foci2)
            {
                foci1_lvl = 2;
                foci3_lvl = 1;
                foci1_desc = await getFociSum(document.getElementById('focusChoice').value, 2);
                foci3_desc = await getFociSum(document.getElementById('focusChoice3').value, 1);

                form.getTextField('Focus1').setText(foci1);
                form.getTextField('Focus Details1').setText(foci1_desc);
                form.getTextField('Focus1Lvl').setText('' + foci1_lvl + '');
                form.getTextField('Focus2').setText(foci3);
                form.getTextField('Focus Detail2').setText(foci3_desc);
                form.getTextField('Focus2Lvl').setText('' + foci3_lvl + '');
            }
            // Foci1 == Foci3
            else if (foci1 == foci3)
            {
                foci1_lvl = 2;
                foci2_lvl = 1;
                foci1_desc = await getFociSum(document.getElementById('focusChoice').value, 2);
                foci2_desc = await getFociSum(document.getElementById('focusChoice2').value, 1);

                form.getTextField('Focus1').setText(foci1);
                form.getTextField('Focus Details1').setText(foci1_desc);
                form.getTextField('Focus1Lvl').setText('' + foci1_lvl + '');
                form.getTextField('Focus2').setText(foci2);
                form.getTextField('Focus Detail2').setText(foci2_desc);
                form.getTextField('Focus2Lvl').setText('' + foci2_lvl + '');
            }
            // Foci2 == Foci3
            else if (foci2 == foci3)
            {
                foci1_lvl = 1;
                foci2_lvl = 2;
                foci1_desc = await getFociSum(document.getElementById('focusChoice').value, 1);
                foci2_desc = await getFociSum(document.getElementById('focusChoice2').value, 2);

                form.getTextField('Focus1').setText(foci1);
                form.getTextField('Focus Details1').setText(foci1_desc);
                form.getTextField('Focus1Lvl').setText('' + foci1_lvl + '');
                form.getTextField('Focus2').setText(foci2);
                form.getTextField('Focus Detail2').setText(foci2_desc);
                form.getTextField('Focus2Lvl').setText('' + foci2_lvl + '');
            }
            // All Foci are unique
            else
            {
                foci1_lvl = 1;
                foci2_lvl = 1;
                foci3_lvl = 1;
                foci1_desc = await getFociSum(document.getElementById('focusChoice').value, 1);
                foci2_desc = await getFociSum(document.getElementById('focusChoice2').value, 1);
                foci2_desc = await getFociSum(document.getElementById('focusChoice2').value, 1);
                form.getTextField('Focus1').setText(foci1);
                form.getTextField('Focus Details1').setText(foci1_desc);
                form.getTextField('Focus1Lvl').setText('' + foci1_lvl + '');
                form.getTextField('Focus2').setText(foci2);
                form.getTextField('Focus Detail2').setText(foci2_desc);
                form.getTextField('Focus2Lvl').setText('' + foci2_lvl + '');
                form.getTextField('Focus3').setText(foci3);
                form.getTextField('Focus Details3').setText(foci3_desc);
                form.getTextField('Focus3Lvl').setText('' + foci3_lvl + '');
            }
        }
        else if (firstEdge == "Voice of the People" || secondEdge == "Voice of the People")
        {
            foci1_desc = await getFociSum(document.getElementById('focusChoice').value, 1);
            form.getTextField('Focus1').setText(foci1);
            form.getTextField('Focus Details1').setText(foci1_desc);
            form.getTextField('Focus1Lvl').setText('' + 1 + '');
            form.getTextField('Focus2').setText('Pop Idol');
            form.getTextField('Focus Detail2').setText(document.getElementById('popDesc').textContent);
            form.getTextField('Focus2Lvl').setText('' + 2 + '');
        }
        // Two unique Foci
        else
        {
            if (foci1 == foci2)
            {
                foci1_lvl = 2;
                foci1_desc = await getFociSum(document.getElementById('focusChoice').value, 2);
                form.getTextField('Focus1').setText(foci1);
                form.getTextField('Focus Details1').setText(foci1_desc);
                form.getTextField('Focus1Lvl').setText('' + foci1_lvl + '');
            }
            else
            {
                foci1_lvl = 1;
                foci2_lvl = 1;
                foci1_desc = await getFociSum(document.getElementById('focusChoice').value, 1);
                foci2_desc = await getFociSum(document.getElementById('focusChoice2').value, 1);

                form.getTextField('Focus1').setText(foci1);
                form.getTextField('Focus Details1').setText(foci1_desc);
                form.getTextField('Focus1Lvl').setText('' + foci1_lvl + '');
                form.getTextField('Focus2').setText(foci2);
                form.getTextField('Focus Detail2').setText(foci2_desc);
                form.getTextField('Focus2Lvl').setText('' + foci2_lvl + '');
            }
        }
    }
    // 1 Focus and potentially Pop Idol
    else
    {
        foci1_desc = await getFociSum(document.getElementById('focusChoice').value, 1);
        form.getTextField('Focus1').setText(foci1);
        form.getTextField('Focus Details1').setText(foci1_desc);
        form.getTextField('Focus1Lvl').setText('' + 1 + '');

        if (firstEdge == 'Voice of the People' || secondEdge == 'Voice of the People')
        {
            form.getTextField('Focus2').setText('Pop Idol');
            form.getTextField('Focus Detail2').setText(document.getElementById('popDesc').textContent);
            form.getTextField('Focus2Lvl').setText('' + 2 + '');
        }
    }

    // Gear
    // document.body.contains(document.getElementById('weapon_1')
    form.getTextField('Weapon Name1').setText(document.getElementById('weapon_0').textContent);
    form.getTextField('CloseRange1').setText(document.getElementById('normal_range_0').textContent);
    form.getTextField('Far Range1').setText(document.getElementById('extreme_range_0').textContent);
    form.getTextField('Trauma Die1').setText(document.getElementById('trauma_die_0').textContent);
    form.getTextField('Trauma Mult1').setText(document.getElementById('trauma_mult_0').textContent);
    form.getTextField('MagSize1').setText(document.getElementById('ammo_0').textContent);
    
    let dmg_mod = parseInt(document.getElementById('dexMod').textContent);
    if (firstEdge == 'Killing Blow' || secondEdge == 'Killing Bow')
    {
        dmg_mod = dmg_mod + 1;
        form.getTextField('Trauma Die1').setText(document.getElementById('trauma_die_0').textContent + "+1");
    }

    form.getTextField('Damage1').setText(document.getElementById('dmg_0').textContent + "+" + dmg_mod.toString());
    let abBonus = 0;
    if (document.getElementById('shootMod').textContent == "")
    {
        abBonus = -2;
    }
    else
    {
        abBonus = parseInt(document.getElementById('shootMod').textContent);
    }
    abBonus = abBonus + parseInt(document.getElementById('dexMod').textContent);
    form.getTextField('AB1').setText(abBonus.toString());
    // if there is a knife
    if (document.body.contains(document.getElementById('weapon_1')))
    {
        form.getTextField('Weapon Name2').setText(document.getElementById('weapon_1').textContent);
        form.getTextField('CloseRange2').setText(document.getElementById('normal_range_1').textContent);
        form.getTextField('Far Range2').setText(document.getElementById('extreme_range_1').textContent);
        form.getTextField('Trauma Die2').setText(document.getElementById('trauma_die_1').textContent);
        form.getTextField('Trauma Mult2').setText(document.getElementById('trauma_mult_1').textContent);
        
        // determine if strength or dex is higher
        let bonusMod = 0;
        if (parseInt(document.getElementById('dexMod').textContent) > parseInt(document.getElementById('strMod').textContent))
        {
            bonusMod = parseInt(document.getElementById('dexMod').textContent);
        }
        else
        {
            bonusMod = parseInt(document.getElementById('strMod').textContent);
        }
        
        // Calculate damage if Killing Blow edge is selected
        let dmg_mod2 = bonusMod;
        if (firstEdge == 'Killing Blow' || secondEdge == 'Killing Bow')
        {
            dmg_mod2 = dmg_mod2 + 1;
            form.getTextField('Trauma Die2').setText(document.getElementById('trauma_die_1').textContent + "+1")
        }


        form.getTextField('Damage2').setText(document.getElementById('dmg_1').textContent + "+" + dmg_mod2.toString());
        let abBonus2 = 0;
        if (document.getElementById('stabMod').textContent == "")
        {
            abBonus2 = -2;
        }
        else
        {
            abBonus2 = parseInt(document.getElementById('stabMod').textContent);
        }
        abBonus2 = abBonus2 + bonusMod;
        form.getTextField('AB2').setText(abBonus2.toString());
        form.getTextField('Shock2').setText(document.getElementById('shock_1').textContent);
    }

    // Armor
    form.getTextField('Current Armor').setText(document.getElementById('armor_0').textContent);
    let MAC = parseInt(document.getElementById('melee_ac_0').textContent) + parseInt(document.getElementById('dexMod').textContent);
    form.getTextField('MAC').setText(MAC.toString());
    let RAC = parseInt(document.getElementById('ranged_ac_0').textContent) + parseInt(document.getElementById('dexMod').textContent);
    form.getTextField('RAC').setText(RAC.toString());
    form.getTextField('ArSoak').setText(document.getElementById('damage_soak_0').textContent);

    let tt = 6;
    if (firstEdge == 'Hard To Kill' || secondEdge == 'Hard To Kill')
    {
        console.log('here');
        tt = 7;
    }
    tt = tt + parseInt(document.getElementById('trauma_target_bonus_0').textContent);
    form.getTextField('TT').setText(tt.toString());

    var iterate = 1;
    for (var item in otherItems)
    {
        form.getTextField('Readied Item' + iterate).setText(otherItems[iterate - 1]);
        iterate++;
    }

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, document.getElementById('c_name').value + '_cwn_sheet.pdf', 'application/pdf');     
}

function capitalFirst(word)
{
    var capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalized;
}

function selectText(id)
{
    var x = document.getElementById(id);
    return x.options[x.selectedIndex].text;
}

async function getFociSum(name, level)
{
    let obj;
    const res = await fetch('./json/foci.json')
    obj = await res.json();

    let sum;

    if (level == 1)
    {
        sum = obj[name].level_1_sum;
    }
    else
    {
        sum = obj[name].level_2_sum;
    }

    return sum;
}

let otherItems = [];

async function showGearInfo(id)
{
    let obj;
    const res = await fetch('./json/gear.json')
    obj = await res.json();

    var selected = document.getElementById(id).value;
    document.getElementById('gearFull').innerHTML = "";

    for (var item of obj[selected].items)
    {
        var itemDiv = document.createElement('div');
        itemDiv.textContent = item;
        itemDiv.style.textAlign = 'center';
        itemDiv.style.border = '1px solid #e1e1e1';
        document.getElementById('gearFull').appendChild(itemDiv);
    }

    let obj2;
    const res2 = await fetch('./json/items.json');
    obj2 = await res2.json()

    otherItems = [];
    document.getElementById('gearWeapons').innerHTML = "";
    document.getElementById('gearArmor').innerHTML = "";

    let weaponNum = 0;
    let armorNum = 0;
    for (var item of obj[selected].items)
    {
        // Confirms that the item exists in the items.json file
        if (typeof obj2[item.toLowerCase().replace(" ", "_")] != "undefined")
        {
            var item2 = item.toLowerCase().replace(" ", "_")

            // true = ranged weapon, false = melee weapon or armor
            if (obj2[item2].ranged == true)
            {
                var outerDiv = document.createElement('div');
                var titleP = document.createElement('p');
                titleP.innerHTML = "<b>" + obj2[item2].name + "</b>";
                titleP.style.marginBottom = '2px';
                titleP.style.marginTop = '2px';
                titleP.id = "weapon_" + weaponNum;
                outerDiv.appendChild(titleP);
                

                var innerDiv = document.createElement('div');
                innerDiv.style.marginLeft = '20px';
                innerDiv.style.display = 'grid';
                innerDiv.style.gridTemplateColumns = "25% 25% 25% 25%";
                innerDiv.style.border = "1px solid black";

                let weaponProperties = {"Dmg":obj2[item2].damage, "Normal Range":obj2[item2].range_normal, "Extreme Range":obj2[item2].range_extreme, "Trauma Die":obj2[item2].trauma_die, "Trauma Mult.":obj2[item2].trauma_rating,
                                            "Ammo":obj2[item2].ammo, "Attr":obj2[item2].attr, "Enc":obj2[item2].encumbrance};
                for (var key in weaponProperties)
                {
                    var container = document.createElement('div');
                    container.style = "display: grid; grid-template-columns: max-content auto";
                    var label = document.createElement('div');
                    label.style.width = 'fit-content';
                    var info = document.createElement('div');
                    info.style.marginLeft = '5px';
                    label.innerHTML = "<b>" + key + "</b>" +":";
                    info.id = key.toLowerCase().replace(" ", "_").replace(".", "") + '_' + weaponNum;
                    info.textContent = weaponProperties[key];

                    container.appendChild(label);
                    container.appendChild(info);
                    innerDiv.appendChild(container);
                }

                outerDiv.appendChild(innerDiv);
                document.getElementById('gearWeapons').appendChild(outerDiv);

                weaponNum++;
            }
            else
            {
                // if this item is armor
                if (typeof obj2[item2].ranged == "undefined")
                {
                    var outerDiv = document.createElement('div');
                    var titleP = document.createElement('p');
                    titleP.innerHTML = "<b>" + obj2[item2].name + "</b>";
                    titleP.style.marginBottom = '2px';
                    titleP.style.marginTop = '2px';
                    titleP.id = "armor_" + armorNum;
                    outerDiv.appendChild(titleP);

                    var innerDiv = document.createElement('div');
                    innerDiv.style.marginLeft = '20px';
                    innerDiv.style.display = 'grid';
                    innerDiv.style.gridTemplateColumns = "25% 25% 25% 25%";
                    innerDiv.style.border = "1px solid black";
    
                    let weaponProperties = {"Ranged AC":obj2[item2].ranged_ac, "Melee AC":obj2[item2].melee_ac, "Damage Soak":obj2[item2].damage_soak, "Trauma Target Bonus":obj2[item2].tt_bonus, "Enc":obj2[item2].encumbrance};
                    for (var key in weaponProperties)
                    {
                        var container = document.createElement('div');
                        container.style = "display: grid; grid-template-columns: max-content auto";
                        var label = document.createElement('div');
                        label.style.width = 'fit-content';
                        var info = document.createElement('div');
                        info.style.marginLeft = '5px';
                        label.innerHTML = "<b>" + key + "</b>" +":";
    
                        info.id = key.toLowerCase().replaceAll(" ", "_").replace(".", "") + '_' + armorNum;
    
                        info.textContent = weaponProperties[key];
                        container.appendChild(label);
                        container.appendChild(info);
                        innerDiv.appendChild(container);
                    }

                    outerDiv.appendChild(innerDiv);
                    document.getElementById('gearArmor').appendChild(outerDiv);

                    armorNum++;
                }
                // if melee weapon
                else
                {
                    var outerDiv = document.createElement('div');
                    var titleP = document.createElement('p');
                    titleP.innerHTML = "<b>" + obj2[item2].name + "</b>";
                    titleP.style.marginBottom = '2px';
                    titleP.style.marginTop = '2px';
                    titleP.id = "weapon_" + weaponNum;
                    outerDiv.appendChild(titleP);

                    var innerDiv = document.createElement('div');
                    innerDiv.style.marginLeft = '20px';
                    innerDiv.style.display = 'grid';
                    innerDiv.style.gridTemplateColumns = "25% 25% 25% 25%";
                    innerDiv.style.border = "1px solid black";
    
                    let weaponProperties = {"Dmg":obj2[item2].damage, "Normal Range":obj2[item2].range_normal, "Extreme Range":obj2[item2].range_extreme, "Trauma Die":obj2[item2].trauma_die, "Trauma Mult.":obj2[item2].trauma_rating,
                                                "Shock":obj2[item2].shock, "Attr":obj2[item2].attr, "Enc":obj2[item2].encumbrance};
                    for (var key in weaponProperties)
                    {
                        var container = document.createElement('div');
                        container.style = "display: grid; grid-template-columns: max-content auto";
                        var label = document.createElement('div');
                        label.style.width = 'fit-content';
                        var info = document.createElement('div');
                        info.style.marginLeft = '5px';
                        label.innerHTML = "<b>" + key + "</b>" +":";
    
                        info.id = key.toLowerCase().replaceAll(" ", "_").replace(".", "") + '_' + weaponNum;
    
                        info.textContent = weaponProperties[key];
                        container.appendChild(label);
                        container.appendChild(info);
                        innerDiv.appendChild(container);
                    }

                    outerDiv.appendChild(innerDiv);
                    document.getElementById('gearWeapons').appendChild(outerDiv);

                    weaponNum++;
                }
            }
        }
        else
        {
            otherItems.push(item);
        }
    }
}