
const blogList = document.getElementById("blogList");
    const theme = localStorage.getItem("theme");
    if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");

    function toggleTheme() {
      const current = document.documentElement.getAttribute("data-theme");
      if (current === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    }

    function getPosts() {
      return JSON.parse(localStorage.getItem("posts")) || [];
    }

    function savePosts(posts) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }

    function addPost() {
      const title = document.getElementById("title").value.trim();
      const content = document.getElementById("content").value.trim();
      const image = document.getElementById("image").value.trim();
      if (!title || !content) return alert("Title and content required!");

      const post = {
        id: Date.now(),
        title,
        content,
        image,
        date: new Date().toLocaleString()
      };

      const posts = getPosts();
      posts.unshift(post);
      savePosts(posts);
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
      document.getElementById("image").value = "";
      renderPosts();
    }

    function renderPosts() {
      const posts = getPosts();
      blogList.innerHTML = "";

      if (posts.length === 0) {
        blogList.innerHTML = "<p>No blog posts yet. Start writing!</p>";
        return;
      }

      posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
          <h3>${post.title}</h3>
          <small>📅 ${post.date}</small>
          <p>${post.content}</p>
          ${post.image ? `<img src="${post.image}" alt="blog image" loading="lazy" />` : ""}
        `;
        blogList.appendChild(div);
      });
    }

    function searchPosts() {
      const query = document.getElementById("search").value.toLowerCase();
      const posts = document.querySelectorAll(".post");
      posts.forEach(post => {
        const text = post.innerText.toLowerCase();
        post.style.display = text.includes(query) ? "block" : "none";
      });
    }

    renderPosts();
