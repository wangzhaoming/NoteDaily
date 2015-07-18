/**
 * Created by Taberna on 2015/7/18.
 */
$(document).ready(function () {
    $(".lnkNoteBook").click(function () {
        var noteBookName = $(this).text();
        getHtml("/notes/",
            {
                "noteBookName": noteBookName
            },
            "noteList",
            function () {
                $(".lnkNote").click(function () {
                    getHtml("/note/",
                        {
                            "nid": $(this).attr("nid")
                        },
                        "noteContent"
                    );
                });
            }
        );

        $("#noteContent").html("");
    });

    $(".max-height").height($(window).height() - 130);

    $(window).resize(function () {
        $(".max-height").height($(window).height() - 130);
    });
});