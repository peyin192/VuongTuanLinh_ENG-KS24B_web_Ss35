document.addEventListener("DOMContentLoaded", () => {
    const addBookmarkBtn = document.getElementById("addBookmarkBtn");
    const modal = document.getElementById("bookmarkForm");
    const closeBtn = document.querySelector(".close");
    const saveBookmarkBtn = document.getElementById("saveBookmark");
    const bookmarksList = document.getElementById("bookmarksList");

    addBookmarkBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    saveBookmarkBtn.addEventListener("click", () => {
        const websiteName = document.getElementById("websiteName").value.trim();
        const websiteURL = document.getElementById("websiteURL").value.trim();

        if (websiteName === "" || websiteURL === "") {
            alert("Please enter all required information!");
            return;
        }

        const bookmark = { name: websiteName, url: websiteURL };
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

        document.getElementById("websiteName").value = "";
        document.getElementById("websiteURL").value = "";
        modal.style.display = "none";

        displayBookmarks();
    });

    function displayBookmarks() {
        bookmarksList.innerHTML = "";
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

        bookmarks.forEach((bookmark, index) => {
            const div = document.createElement("div");
            div.classList.add("bookmark-item");
            div.innerHTML = `
                <img src="https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}" class="favicon" alt="Favicon">
                <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
                <button class="delete-btn" data-index="${index}">X</button>
            `;
            bookmarksList.appendChild(div);
        });

        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
                const index = event.target.getAttribute("data-index");
                bookmarks.splice(index, 1);
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
                displayBookmarks();
            });
        });
    }

    displayBookmarks();
});
