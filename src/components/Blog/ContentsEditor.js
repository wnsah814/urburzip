import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

import { useRef } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { dbService } from "fbase";
import { useNavigate } from "react-router-dom";

import styles from "./ContentsEditor.module.css";

const ContentEditor = () => {
    const titleRef = useRef();
    const editorRef = useRef();
    const navigator = useNavigate();

    const submitUpdate = async () => {
        if (
            titleRef.current.value === "" ||
            editorRef.current.getInstance().getHTML() === "<p><br></p>"
        ) {
            alert("모든 칸을 채워주세요");
            return;
        }
        const blogObj = {
            title: titleRef.current.value,
            content: editorRef.current.getInstance().getMarkdown(),
            createdAt: serverTimestamp(),
        };
        const data = await addDoc(collection(dbService, "blogs"), blogObj);
        console.log(data.id);
        navigator(`/blog/${data.id}`);
    };
    return (
        <>
            <div className={styles.header}>
                <input
                    className={styles.title}
                    ref={titleRef}
                    type={"text"}
                    placeholder="제목을 입력해주세요"
                />
                <button className={styles.button} onClick={submitUpdate}>
                    저장
                </button>
            </div>
            <Editor
                ref={editorRef}
                initialValue="hello react editor world"
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                hideModeSwitch={true}
                useCommandShortcut={false}
                plugins={[colorSyntax]}
                language="ko-KR"
            />
        </>
    );
};
export default ContentEditor;
