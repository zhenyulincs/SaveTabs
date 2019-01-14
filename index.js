$('document').ready(function() {
    clickFunction()
})

function clickFunction() {
    option_all = $('option')[0]
    option_current = $('option')[1]
    resume = $('option')[2]
    windowID = []
    my_list_1 = []
    my_list_2 = []
    my_list_3 = []
    my_list_4 = []
    my_list_5 = []
    windowID_created = []
    $('button').click(function () {
        if (option_all.selected == true) {
            chrome.tabs.query({}, function(tabs) {
                chrome.storage.local.set({'all_tabs':tabs},function() {
                    alert('Your tabs are save successfully')
                })
            })
        }
        if (option_current.selected == true) {
            chrome.tabs.query({'active':true},function(tab) {
                chrome.storage.local.set({'all_tabs':tab}, function() {
                    alert('Your tab is save successfully')
                })
            })
        }                                           
        if (resume.selected == true) {
            chrome.storage.local.get(['all_tabs'],function(result) {
                result['all_tabs'].forEach(x => {
                    windowID.push(x.windowId)
                });
                no_repeat_window_ID = new Set(windowID)
                no_repeat_window_ID = Array.from(no_repeat_window_ID)
                if (result['all_tabs'].length == no_repeat_window_ID.length) {
                    for (var f=0;f<no_repeat_window_ID.length;f++) {
                        chrome.windows.create({
                            url:result['all_tabs'][f].url
                        })
                    }
                }else {
                    var g = 0
                    for (var i = 0; i < no_repeat_window_ID.length; i++) {
                        my_list_1.push([])
                    }
                    for (var a = 0; a < result['all_tabs'].length - 1; a++) {
                        if (result['all_tabs'][a].windowId == result['all_tabs'][a + 1].windowId) {
                            my_list_2.push(result['all_tabs'][a].url)
                            my_list_4.push(result['all_tabs'][a].windowId)
                            if (a == result['all_tabs'].length - 2) {
                                my_list_1[g].push(my_list_2)
                                my_list_2 = []
                            }
                        }
                        else {
                            if (a == 0) {
                                my_list_1[0].push([result['all_tabs'][0].url])
                                g++
                            }
                            else {
                                my_list_2.push(result['all_tabs'][a].url)
                                my_list_4.push(result['all_tabs'][a].windowId)
                                my_list_1[g].push(my_list_2)
                                my_list_2 = []
                                my_list_4 = []
                                g++
                            }
                        }
                    }
                    my_list_3.push(result['all_tabs'][result['all_tabs'].length-1].url)
                    my_list_5.push(result['all_tabs'][result['all_tabs'].length - 1].windowId)
                    if (my_list_5[0] == my_list_4[0]) {
                        my_list_1[my_list_1.length - 1][0].push(my_list_3[0])
                    }
                    else {
                        my_list_1[my_list_1.length - 1].push(my_list_3)
                    }
                    var t = 0
                    for (var k = 0; k < no_repeat_window_ID.length; k++) {
                        chrome.windows.create({}, function (ID) {
                            windowID_created.push(ID.id)
                            t++
                            if (t == no_repeat_window_ID.length) {
                                for (var h = 0; h < no_repeat_window_ID.length;) {
                                    my_list_1_length = my_list_1[h][0].length
                                    for (var j = 0; j < my_list_1_length; j++) {
                                        chrome.tabs.create({
                                            url: my_list_1[h][0][j],
                                            windowId: windowID_created[h]
                                        })
                                        if (j == my_list_1_length - 1) {
                                            h++
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
            })
        }
    })
}