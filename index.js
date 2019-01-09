$('document').ready(function() {
    clickFunction()
})

function clickFunction() {
    option_all = $('option')[0]
    option_current = $('option')[1]
    resume = $('option')[2]
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
                    chrome.tabs.create({
                        url:x.url
                    })
                });
            })
        }
    })
    
    
}