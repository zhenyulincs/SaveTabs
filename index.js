$('document').ready(function() {
    clickFunction()
})

function clickFunction() {
    option_all = $('option')[0]
    option_current = $('option')[1]
    $('button').click(function () {
        if (option_all.selected == true) {
            chrome.tabs.query({}, function(tabs) {
                chrome.storage.sync.set({key:tabs},function() {
                    alert('Your tabs are save successfully')
                })
            })
        }
    })
}