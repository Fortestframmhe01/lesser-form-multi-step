$(document).ready(function() {

    /** Multi Step */
    $.fn.steps = function(dataObj) {
        var current = 0
        var elementCurrent
        var elementNext
        var btnNext = $('*[data-toggle|="' + dataObj.next + '"]')
        var btnPrev = $('*[data-toggle|="' + dataObj.prev + '"]')
        var step = $(dataObj.step)
        var result = false

        var stepCount = 1

        var listStep = dataObj.required
        var toCheck
        var resultToNext = false

        var progress = $(dataObj.progress)
        var calProgress = 100 / step.length
        var setProgress = 0
        progress.css('width', setProgress + '%')

        btnNext.click(function() {
            $.each(step, function(index, value) {
                elementCurrent = step.eq(current)
                elementNext = step.eq(current + 1)
                if(step[current + 1] == undefined) {
                    current = current - 1
                    elementNext = step.eq(current - 1)
                } else {
                    result = true
                }
            })
            if(result == true) {
                $.each(listStep, function(index, value) {
                    checked = listStep[stepCount]
                    toCheck = checked
                })
                
                for(let i = 0; i < toCheck.length; i++) {
                    if(emptyVal(toCheck[i]) == false) {
                        $(toCheck[i]).addClass('is-valid-lesser')
                        resultToNext = false
                    } else {
                        $(toCheck[i]).removeClass('is-valid-lesser')
                        resultToNext = true
                    }
                }
                if(resultToNext == true) {
                    setProgress = setProgress + calProgress
                    progress.css('width', setProgress + '%')
                    elementCurrent.slideUp(300)
                    elementNext.delay(450).slideDown(300)
                    current++
                    stepCount++
                }
            }
        })

        btnPrev.click(function() {
            $.each(step, function(index, value) {
                elementCurrent = step.eq(current)
                elementNext = step.eq(current - 1)
                if(step[current - 1] == undefined) {
                    current = current - 1
                    elementNext = step.eq(current - 1)
                } else {
                    result = true
                }
            })

            if(result == true) { 
                elementCurrent.slideUp(300)
                elementNext.delay(450).slideDown(300)
                current--
                stepCount--
            }
        })

        $('.btn-submit').click(function() {
            $.each(listStep, function(index, value) {
                checked = listStep[stepCount]
                toCheck = checked
            })
            
            for(let i = 0; i < toCheck.length; i++) {
                if(emptyVal(toCheck[i]) == false) {
                    $(toCheck[i]).addClass('is-valid-lesser')
                    resultToNext = false
                } else {
                    $(toCheck[i]).removeClass('is-valid-lesser')
                    resultToNext = true
                }
            }

            if(resultToNext == true) {
                dataObj.success()
            }
        })
    }

    function emptyVal(IdOrClass) {
        let element = $(IdOrClass)
        if(element.val() == '') return false
        else return true
    }


    /** Navbar */
    $('*[data-toggle|="collapseLesser"]').click(function() {
        let attrTarget = $(this).attr('data-target')
        $('.navbar-overlay').fadeIn(300)
        $(attrTarget).animate({
            right: 0,
        }, {
            duration: 400,
            specialEasing: {
                width: "easeOutBounce",
                height: "linear"
            }
        })
    })

    $('*[data-toggle|="collapseLesserHide"]').click(function() {
        let attrTarget = $(this).attr('data-target')
        $('.navbar-overlay').fadeOut(300)
        $(attrTarget).animate({
            right: '-95vw',
        }, {
            duration: 400,
            specialEasing: {
                width: "easeOutBounce",
                height: "linear"
            }
        })
    })

    /** Theme Setting */
    $('.theme-change').click(function() {
        let Color = $(this).attr('id')
        let CurrentClass = $('body').attr('class')
        $('body').removeClass(CurrentClass)
        $('body').addClass(Color)
    })
})