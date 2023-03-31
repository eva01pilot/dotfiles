<?php
    define("NO_KEEP_STATISTIC", true);
    define("NOT_CHECK_PERMISSIONS", true);
    define('CHK_EVENT', true);
    require_once $_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/bx_root.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_before.php';
    
?>

<link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">

<style>
    .nebo-button-panel-bp {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100px;
        margin-left: 10px;
        cursor: pointer;
    }
    
    #nebo-buttons-panel-bp {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 100%;
        width: 320px;
    }

    .activityWithField {
        border: 5px solid red;
    }
    
    @keyframes blink {
        from {
            border: 5px solid red;
        }
        to {
            border: 5px solid white;
        }
    }    

    .nebo-this-activity {
        animation: blink 1s linear infinite;
    }

    .nebo-number-activity {
        font-size: 20px;
    }

</style>

<script>
    let allElems = []; // массив активити с полем
    let nowElemNum = -1; // номер текущего элемента для того, чтобы переходить от одного элемента к другому

    document.ondblclick = function () { // перерасчет координат при каждом клике(на случай, если кликают, чтобы развернуть область)
        let els = [];
        for (let i = 0; i < allElems.length; i++) {
            els.push([allElems[i][1].getBoundingClientRect(), allElems[i][1]]);
        }
        allElems = els;
        console.log(allElems);
    }
    
    function addElemScroll (elem, numElem) { // numElem - порядковый номер элемента
        let coords = elem.getBoundingClientRect();
        allElems.push([coords, elem]);
    }

    function goScroll (pos) { // отвечает за мигания активити и за наведение на него 
        let cntElems = allElems.length;
        let numActivityElem = document.getElementsByClassName('nebo-number-activity')[0];
        
        if (pos == 'next' && cntElems > (nowElemNum + 1)) { // требуют следующий элемент и этот элемент существует
            nowElemNum++;
            window.scroll(allElems[nowElemNum][0].x/1.5, allElems[nowElemNum][0].y - 60);
            numActivityElem.innerHTML = (nowElemNum + 1) + '/' + cntElems; // nowElemNum + 1 - т.к. текущее nowElemNum = 0(индекс массива), а мы должны отображаться число для человека
            
            let elem = allElems[nowElemNum][1];
            if (nowElemNum == 0) { // если мы в 1й раз нажали на "следующее активити", то просто меняем класс активити
                if (elem) { // если элемент есть в БП
                    elem.classList.add('nebo-this-activity');
                    if (elem.classList.contains("activityWithField")) {
                        elem.classList.remove('activityWithField'); // удаляем класс, чтобы поставить свой(наш класс конфликтует с основным)
                    }    
                }
            } else if (nowElemNum > 0) { // а вот здесь мы должны не просто поменять класс текущего активити, но и сбросить настройки предыдущего
                let elemPrev = allElems[nowElemNum - 1][1];
                if (elem) { // если элемент есть в БП
                    elem.classList.add('nebo-this-activity'); // делаем мигание текущего элемента
                    if (elem.classList.contains("activityWithField")) {
                        elem.classList.remove('activityWithField'); // удаляем класс, чтобы поставить свой(наш класс конфликтует с основным)
                    }    
                }
                elemPrev.classList.add('activityWithField'); // возвращаем красную рамку прошлому элементу
                if (elemPrev.classList.contains("nebo-this-activity")) {
                    elemPrev.classList.remove('nebo-this-activity'); // удаляем класс, чтобы поставить свой(наш класс конфликтует с основным)
                }    
            }
        } else if (pos == 'prev' && cntElems > (nowElemNum - 1) && (nowElemNum - 1) >= 0) { // предыдущий существующий элемент
            nowElemNum--;
            // console.log(nowElemNum);
            window.scroll(allElems[nowElemNum][0].x/1.5, allElems[nowElemNum][0].y - 60);    
            numActivityElem.innerHTML = (nowElemNum + 1) + '/' + cntElems; // nowElemNum + 1 - т.к. текущее nowElemNum = 0(индекс массива), а мы должны отображаться число для человека

            let elem = allElems[nowElemNum][1]; // текущий элемнет
            let elemPrev = allElems[nowElemNum + 1][1];
            if (elem) { // если элемент есть в БП
                elem.classList.add('nebo-this-activity'); // делаем мигание текущего элемента
                if (elem.classList.contains("activityWithField")) {
                    elem.classList.remove('activityWithField'); // удаляем класс, чтобы поставить свой(наш класс конфликтует с основным)
                }    
            }
            elemPrev.classList.add('activityWithField'); // возвращаем красную рамку прошлому элементу
            if (elemPrev.classList.contains("nebo-this-activity")) {
                elemPrev.classList.remove('nebo-this-activity'); // удаляем класс, чтобы поставить свой(наш класс конфликтует с основным)
            }    
        }
    }

    function colorActivityArray (title, nameCode, cntActivity) {
        let interval = setInterval(() => { // todo: иногда при нажатии не переходит к активити, мб стоит заменить на таймаут
            //MutationObject
            if (typeof nameCode == 'number' && title != null) {
                let activities = document.getElementsByClassName('activity');
                
                for (let i = 0, j = 0; i < activities.length; i++) {
                    if (activityElements.length >= cntActivity) {
                        // clearInterval(interval);
                        return;
                    }

                    let paragraph = activities[i].innerHTML;
                    const regex = new RegExp(`<div .*?>${title}<\/div>`, 'g');
                    const found = paragraph.match(regex);
                    if (found != null) {
                        if (found.length > 0) { // 0 - подстрока не найдена
                            if (activityElements.indexOf(i) != -1) { // наткнулись на повторный элемент
                                continue;
                            } else {
                                activityElements.push(i);
                                // console.log(i + ' ' + activityElements.length);
                            }
                            if (activities[i].classList.contains("activity-modern")) {
                                activities[i].classList.remove('activity-modern'); // удаляем класс, чтобы поставить свой(наш класс конфликтует с основным)
                            }
                            activities[i].classList.add('activityWithField');
                            addElemScroll(activities[i]);
                            break;
                        }
                    }
                }

                clearInterval(interval);
            }
            let activity = document.getElementById(nameCode);
            if (activity) {
                activity = activity.childNodes[0];
                for (let i = 0; i < activity.children.length; i++) {
                    let paragraph = activity.children[i].innerHTML;
                    const regex = new RegExp(`<div .*?>${title}<\/div>`, 'g');
                    const found = paragraph.match(regex);

                    if (found) {
                        if (found.length > 0) {
                            let elem = activity.children[i].getElementsByClassName('activity')[0];
                            elem.classList.add('activityWithField');
                            addElemScroll(elem);
                            break;
                        }
                    }
                }
                clearInterval(interval);
            }
            
        }, 100);
    }

    function getActivityBP (activityName, activityNum = -1, cntActivity) {
        let interval = setInterval(() => { // todo: иногда при нажатии не переходит к активити, мб стоит заменть на таймаут
            let activities = document.getElementsByClassName('activity-modern');

            if (activities.length > 0) { // знаем какой именно элемент красить
                for (let i = 0, j = 0; i < activities.length; i++) {
                    if (activityNum > 0) {
                        let paragraph = activities[i].innerHTML;
                        const regex = new RegExp(`<div .*?>${title}<\/div>`, 'g');
                        const found = paragraph.match(regex);
                        
                        if(found) {
                            if (found.length > 0) { // -1 - подстрока не найдена
                                j++;
                            }
                            if (activityNum && (activityNum + 1) == j){
                                addElemScroll(activities[i]);
                                activities[i].classList.add('activityWithField');
                                if (activities[i].classList.contains("activity-modern")) {
                                    activities[i].classList.remove('activity-modern'); // удаляем класс, чтобы поставить свой(наш класс конфликтует с основным)
                                }

                                break;
                            }
                        }
                    } else { // не знаем какой именно элемент красить
                        if (activityElements.length >= cntActivity) {
                            clearInterval(interval);
                            return;
                        }
                        let paragraph = activities[i].innerHTML;
                        const regex = new RegExp(`<div .*?>${activityName}<\/div>`, 'g');
                        const found = paragraph.match(regex);

                        if (found) {
                           if (found.length > -1) { // -1 - подстрока не найдена
                                if (activityElements.indexOf(i) != -1) { // наткнулись на повторный элемент
                                    continue;
                                } else {
                                    activityElements.push(i);
                                }
                                addElemScroll(activities[i]);
                                activities[i].classList.add('activityWithField');
                                if (activities[i].classList.contains("activity-modern")) {
                                    activities[i].classList.remove('activity-modern'); // удаляем класс, чтобы поставить свой(наш класс конфликтует с основным)
                                }
                                break;
                            }
                        }
                    }
                }
                console.log('interval', interval)
            }
        }, 100);
        return ()=>clearInterval(interval);
    }

    function getElementBPNotState (names, cntActivity) {
        var counter = 0;
        for (var key in names['other']) {
            counter++;
        }

        let j = 0; // определяет номер одинаковых активити
        for (var key in names['other']) {
            if (Number(key) >= 0) {
                colorActivityArray(names['other'][key], Number(key), cntActivity);
            } else {
                colorActivityArray(names['other'][key], key, cntActivity);
            }
        }
    }

    function getElementBPState (names) {
        let elemState = '';
        let elemParent = '';

        //window.onload = function() {
            for (let index = 0; index < names['StateActivity'].length; index++) {            
                elemState = document.getElementById(names['StateActivity'][index]); // верхушка БП со статусом(вход в статус) todo: дополнить, если поле используется в двух и более БП со статусом
                if (!elemState) continue;
                elemParent = elemState.parentNode.parentNode;
                addElemScroll(elemParent);
                elemParent.classList.add('activityWithField');
                
                elemParent.onclick = function () {
                    allElems = []; // возвращаем настройки в изначальное положение, т.к. от статусов переходим к активити
                    nowElemNum = -1; // номер текущего элемента для того, чтобы переходить от одного элемента к другому

                    getActivityBPState(names['other'][names['StateActivity'][index]], names['other'][names['StateActivity'][index]].length);
                }
            }
        //}
    }

    function getActivityBPState (otherActivity, cntActivity) {
        console.log(otherActivity);
        for (let index = 0; index < otherActivity.length; index++) {
            const nameActivity = otherActivity[index];
            getActivityBP(nameActivity, -1, cntActivity);
        }
    }
</script>

<?php
\CModule::includeModule('nebo.userfield');
use Nebo\UserField\GlobalEntity as GlobalEntity;

if (!$_REQUEST['data']) {
    $r = $_REQUEST;
    unset($_REQUEST);
    $_REQUEST['data'] = $r;
}


$entityObj = Nebo\UserField\GlobalEntity::getInstance()->modKeyData('CODE');
$entityData = $entityObj->getData()[$_REQUEST['data']['ENTITY_ID']];

$bpObj = Nebo\UserField\GlobalBP::getInstance($_REQUEST['data']['ID']);
$dataBPObj = unserialize(gzuncompress($bpObj->getData()[$_REQUEST['data']['ID']]['TEMPLATE']));

function findValue($array, $value) {
    $keys = array();
    global $headers, $names, $sub;
    
    foreach ($array as $key => $val) {
        if (is_array($val)) {
            $sub = findValue($val, $value);

            if (!empty($sub)) {
                $keys[] = $key;

                foreach ($sub as $s) {
                    $keys[] = $s;
                }

                return $keys;
            }
        }

        if ($val === $value) {
            $keys[] = $key;
            return $keys;
        }
    }

    return $keys; 
}

function search ($array, $value) {
    global $result, $pathKey, $i, $j, $headers, $names, $mainArr, $sub;
    foreach ($array as $k => $item) {
        if (is_array($item)) {
            if (strpos(json_encode($item), $value)) {
                
                if ($item['Type'] == 'StateActivity') {
                    $names[$item['Type']][] = $item['Name'];
                }
                
                $pathKey[] = $k;
                
                $mainArr = $mainArr[$k];
                
                if (strpos(json_encode($item['Properties']), $value)) {
                    $stateName = $names['StateActivity'][count($names['StateActivity']) - 1];
                    $names['other'][$stateName][] = $item['Properties']['Title']; // определяем иерархию активити со статусом и обычных активити
                }

                search($item, $value);
            }
        }
        
        if (preg_match('#.*?' . $value . '.*?#', $k)) {
            $result = $k;
            return $result;
            break;
        }
    }
    return $result;
}

function searchNotState ($array, $value) {
    global $result, $pathKey, $i, $j, $headers, $names, $mainArr, $sub;
    echo '<pre>';
    foreach ($array as $k => $item) {
        if (is_array($item)) {
            if (strpos(json_encode($item), $value)) {
                $pathKey[] = $k;
                $mainArr = $mainArr[$k];
                if (count($item['Children'])) { // если есть дети
                    if (strpos(json_encode($item['Properties']), $value)) {
                        $names['other'][$item['Name']] = $item['Properties']['Title']; // определяем иерархию активити со статусом и обычных активити
                    }
                } else {
                    if (strpos(json_encode($item), $value)) { // нет детей - самостоятельное активити
                        if (!$item['Name']) {
                            $names['other'][$i] = $item['Title']; // определяем иерархию активити со статусом и обычных активити
                        }
                    }
                }

                $i++;
                searchNotState($item, $value);
            }
        }
        
        if (preg_match('#.*?' . $value . '.*?#', $k)) {
            $result = $k;
            return $result;
            break;
        }
    }

    echo '</pre>';
    return $result;
}

// function arrayWalkRecursive($array, $activityName, $titleActivity) // определяет номер нужного активити
// {
//     unlink(__DIR__ . '/log_bluat.txt');
//     echo $activityName;
//     $i = 0; // счетчик одинаковых названий
//     foreach ($array as $key => $value) {
//         if (is_array($value)) {
//             arrayWalkRecursive($value);
//         } else {
//             file_put_contents(__DIR__ . '/log_bluat.txt', "$key - $value\n", FILE_APPEND);
//             // echo "$value<br>";
//             if ($value == $activityName) { // наше активити
//                 echo "$activityName<br>";
//                 return $i + 1;
//             } elseif ($value == $titleActivity) { // встретили активити с таким же названием
//                 $i++;
//             }
//         }
//     }
// }

$arResult = [ // todo: добавить обработку ситуации, когда вызывается левая сущность, у которой нет БП(из-за того, что не все поля $arResult заполнены)
    'ENTITY_ID' => $_REQUEST['data']['ENTITY_ID'],
    'BP_ID' => $_REQUEST['data']['ID'],
    'ENTITY_NAME' => $_REQUEST['data']['ENTITY_ID_VIS'],
    'ENTITY_TYPE' => $entityData['DOCUMENT_CLASS'],
    'DOCUMENT_TYPE' => $entityData['ENTITY'],
    'IS_BIZPROC_DESIGNER_ENABLED' => 1,
    'ENTITY_LIST_URL' => '/crm/configs/bp/',
    '~ENTITY_LIST_URL' => '/crm/configs/bp/',
    '~BP_LIST_URL' => "/crm/configs/bp/{$_REQUEST['data']['ENTITY_ID']}CRM_DEAL/",
    'BP_LIST_URL' => "/crm/configs/bp/{$_REQUEST['data']['ENTITY_ID']}CRM_DEAL/",
    '~BP_EDIT_URL' => "/crm/configs/bp/{$_REQUEST['data']['ENTITY_ID']}/edit/{$_REQUEST['data']['ID']}/",
    'BP_EDIT_URL' => "/crm/configs/bp/{$_REQUEST['data']['ENTITY_ID']}/edit/{$_REQUEST['data']['ID']}/",
];

?>
<div style="width:100%;">
    <?php
        global $APPLICATION;
        $APPLICATION->ShowHead();//для Работы BX js
        $GLOBALS["APPLICATION"]->ShowCSS();

        $field = $_REQUEST['data']['FIELD_NAME'];
        $code = $dataBPObj;
        
        // $code2 = serialize($code);
        // $code2 = preg_replace('#DesMinimized";s:(\d+):"Y#', 'DesMinimized";s:$1:"N', $code2);
        // $code2 = unserialize($code2);

        // file_put_contents(__DIR__.'/bpbpbpCODE22222.txt', print_r($code2, 1));
        if ($code[0]['Type'] == 'StateMachineWorkflowActivity') {
            // file_put_contents(__DIR__.'/state.txt', print_r($code, 1));
            
            foreach ($code as $i => $vArr) {
                $result = '';
                $pathKey = [];
                $headers = [];
                $names = [];
                $result = search($vArr, $field);

                if ($result) {
                    $headers = array_filter($headers);
                    $names = array_filter($names);
                    $name = $names[0];
                    $headers[] = $_REQUEST['data']['ENTITY_ID_VIS'];
                    break;
                }
            }
            
            // echo '<pre>';
            // print_r($names);
            // echo '</pre>';
            
            ?>
            <script>
                let activityElements = [];
                window.requestAnimationFrame(()=>{
                    getElementBPState(<?=json_encode($names)?>)
                    window.requestAnimationFrame(()=>{
                        getElementBPState(<?=json_encode($names)?>)
                    })
                });
            </script>
            <?
        } else { // обычные БП без статусов
            foreach ($code[0]['Children'] as $i => $vArr) {
                $j = 0;
                $mainArr = $code[0]['Children'][$i];
                $result = '';
                $pathKey = [];
                $headers = [];
                $result = searchNotState($vArr, $field);
            }
            
            $names['other'] = array_filter($names['other']); // убираем пустые элементы, если они имеются
            
            ?>
            <script>
                let activityElements = [];
                getElementBPNotState(<?=json_encode($names)?>, <?=json_encode(count($names['other']))?>);
            </script>
            <?php
        }
        
        // foreach ($names['other'] as $state => &$vArr) {
        //     foreach ($vArr as $activityName => $titleActivity) {
        //         // $vArr[$activityName]['num'] = arrayWalkRecursive($code, $activityName, $titleActivity);
        //         var_dump(arrayWalkRecursive($code, $activityName, $titleActivity));
        //     }
        // }
        
        echo '<pre>';
        // print_r($names);
        // print_r($pathKey);
        echo '</pre>';

        echo '</pre>';
        if (!$arResult['ENTITY_ID']) exit('Невозможно отобразить данные');
        
        $APPLICATION->IncludeComponent(
            'nebo:bizproc.workflow.edit',
            '',
            [
                'MODULE_ID' => 'crm',
                'ENTITY' => $arResult['ENTITY_TYPE'],
                'DOCUMENT_TYPE' => $arResult['DOCUMENT_TYPE'],
                'ID' => $arResult['BP_ID'],
                'EDIT_PAGE_TEMPLATE' => CComponentEngine::MakePathFromTemplate(
                    $arResult['~BP_EDIT_URL'],
                    ['bp_id' => '#ID#']
                ),
                'LIST_PAGE_URL' => $arResult['~BP_LIST_URL'],
                'SKIP_BP_TEMPLATES_LIST' => $arResult['IS_BIZPROC_DESIGNER_ENABLED'] ? 'N' : 'Y',
                'SKIP_BP_TYPE_SELECT' => $arResult['IS_BIZPROC_DESIGNER_ENABLED'] ? 'N' : 'Y',
            ],
        );

    ?>

</div>

<script>

    function deleteActionPanel() {
        setTimeout(() => { // заменить на MutationObject
            let neboActivities = document.getElementsByClassName('activityWithField'); // активити с рамкой

            let panelMain = document.getElementById('ui-button-panel');
            panelMain.style.background = 'white';
            panelMain.style.padding = '20px';
            panelMain.innerHTML = '';
            panelMain.innerHTML += '<div id="nebo-buttons-panel-bp"></div>';

            let panelNeboBP = document.getElementById('nebo-buttons-panel-bp');
            panelNeboBP.innerHTML += '<div class="nebo-button-panel-bp" onclick=goScroll("prev")><i class="fa fa-long-arrow-left fa-2x"></i>Предыдущее активити</div>';
            panelNeboBP.innerHTML += '<div class="nebo-number-activity"> 0/' + neboActivities.length + ' </div>';
            panelNeboBP.innerHTML += '<div class="nebo-button-panel-bp" onclick=goScroll("next")><i class="fa fa-long-arrow-right fa-2x"></i>Следующее активити</div>';
        }, 200);

        let intervalNumActivity = setInterval(() => { // данный интервал отрисовывает актуальное кол-во активити, найденное в БП
            if (allElems.length > 0) {
                clearInterval(intervalNumActivity);
                let numActivityElem = document.getElementsByClassName('nebo-number-activity')[0];
                numActivityElem.innerHTML = '0/' + allElems.length;
            }
        }, 200);
    }

    deleteActionPanel();
    
</script>