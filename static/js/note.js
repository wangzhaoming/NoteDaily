/**
 * Created by Taberna on 2015/7/18.
 */
var g_selected_note_book_name = "";
var g_selected_note_id = "";

$(document).ready(function () {
    function getContent() {
        g_selected_note_id = $(this).attr("nid");
        fetchData("/note/",
            {
                "nid": $(this).attr("nid")
            },
            function (data) {
                CKEDITOR.instances.editorArea.setData(data);
            }
        );
    }

    function getNotes() {
        var noteBookName = $(this).text();
        g_selected_note_book_name = noteBookName;
        getHtml("/notes/",
            {
                "noteBookName": noteBookName
            },
            "noteList",
            function () {
                $(".lnkNote").click(getContent);
            }
        );

        CKEDITOR.instances.editorArea.setData("");
    }

    $(".lnkNoteBook").click(getNotes);

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

    CKEDITOR.instances.editorArea.on('blur', function () {
        if (g_selected_note_id !== "") {
            var content = CKEDITOR.instances.editorArea.getData();
            fetchData("/note/save/",
                {"content": content, "nid": g_selected_note_id},
                function (data) {
                    if (data !== "0") {
                        alert("Save Failed!");
                    }
                }
            );
        }
    });

    $("#newNotebook").click(function () {
        var input = $("<input type='text' id='tmp'></input>");
        $("#notebookList").prepend(input);
        $("#tmp").blur(function () {
            var name = $(this).val();
            $(this).remove();

            fetchData("/notebook/add/",
                {"name": name},
                function (data) {
                    if (data === "0") {
                        $("#notebookUl").prepend("<li><a href='javascript:;' class='lnkNoteBook'>" + name + "</a></li>");
                        $(".lnkNoteBook").unbind();
                        $(".lnkNoteBook").click(getNotes);
                    }
                }
            );
        });
    });

    $("#newNote").click(function () {
        var input = $("<input type='text' id='tmp'></input>");
        $("#noteList").prepend(input);
        $("#tmp").blur(function () {
            var name = $(this).val();
            $(this).remove();

            fetchData("/note/add/",
                {"name": name, "bname": g_selected_note_book_name},
                function (data) {
                    if (data["status"] === "0") {
                        $("#noteUl").prepend("<li><a class='lnkNote' href='javascript:;' nid='" + data["nid"] + "'>" + name + "</a></li>");
                        $(".lnkNote").unbind();
                        $(".lnkNote").click(getContent);
                    }
                });
        });
    });
});