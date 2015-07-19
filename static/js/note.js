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
                    fetchData("/note/",
                        {
                            "nid": $(this).attr("nid")
                        },
                        function (data) {
                            CKEDITOR.instances.editorArea.setData(data);
                        }
                    );
                });
            }
        );

        CKEDITOR.instances.editorArea.setData("");
    });

    $(".max-height").height($(window).height() - 130);
    $("#noteContent").width($(window).width() - 450);

    $(window).resize(function () {
        $(".max-height").height($(window).height() - 130);
        $("#noteContent").width($(window).width() - 450);
        CKEDITOR.instances.editorArea.height = $(".max-height").height();
    });

    CKEDITOR.replace('editorArea', {
        width: '100%',
        height: $(".max-height").height()
    });
});