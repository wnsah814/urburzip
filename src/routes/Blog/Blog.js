// import YouTubePlayer from "components/YoutubePlayer";
import styles from "./Blog.module.css";
// import ContentsViewer from "components/toastUI/ContentsViewer";
import ContentEditor from "components/Blog/ContentsEditor";
import { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";

const Blog = ({ userObj }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const q = query(
            collection(dbService, "blogs"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const blogArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBlogs(blogArr);
        });
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.header_wrapper}>
                <h2 className={styles.header}>URB_log</h2>
                {userObj?.isAd && (
                    <Link to="/blog/new">
                        <div className={styles.button}>글쓰기</div>
                    </Link>
                )}
            </div>

            <div className={styles.blogs}>
                {blogs.map((v, i) => (
                    <Link to={`/blog/${v.id}`}>
                        <div key={i} className={styles.blog}>
                            <span className={styles.blog_id}>
                                {blogs.length - i - 1}
                            </span>
                            <span className={styles.blog_title}>{v.title}</span>
                        </div>
                    </Link>
                ))}

                {/* <h2>22' 공학인의 밤</h2>
                <div className={styles.video}>
                    <h3>DNA</h3>
                    <YouTubePlayer
                        src="https://www.youtube.com/embed/ZpZkFe9YHJ4"
                        title="YouTube video player"
                    ></YouTubePlayer>
                </div>
                <div className={styles.video}>
                    <h3>꿈찾기</h3>
                    <YouTubePlayer
                        src="https://www.youtube.com/embed/c_GW-Oe6BKM"
                        title="YouTube video player"
                    ></YouTubePlayer>
                </div>
                <div className={styles.video}>
                    <h3>날자</h3>
                    <YouTubePlayer
                        src="https://www.youtube.com/embed/WzK95HBXVeI"
                        title="YouTube video player"
                    ></YouTubePlayer>
                </div> */}
            </div>
        </div>
    );
};

export default Blog;
