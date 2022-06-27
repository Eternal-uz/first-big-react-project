import { useState } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/Button/MyButton";
import MyModal from "./components/UI/Modal/MyModal";
import { usePosts } from "./hooks/usePosts";

import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript", body: "description" },
    { id: 2, title: "Python", body: "description" },
    { id: 3, title: "PHP", body: "description" },
  ]);
  const [filter, setFilter] = useState({ query: "", sort: "" });
  const [modal, setModal] = useState(false);
  
  const sortedAndSearchedPosts = usePosts(posts, filter.query, filter.sort)

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };





  return (
    <div className="App">
      <MyButton style={{marginTop: '20px'}} onClick={(e) => setModal(true)}>Create a Post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="List of Posts"
      />
    </div>
  );
}

export default App;
