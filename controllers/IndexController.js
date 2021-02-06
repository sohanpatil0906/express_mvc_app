class IndexController{
    /**
     * Method To Render Index Page
     */
    renderPage = async(req, res)=>{
        return res.render("blank/index", {title: "Index Page"});
    }

    /**
     * Method To Render Index Page
     */
    // renderPage = [
    //     auth,
    //     async(req, res)=>{
    //         return res.render("index");
    //     }
    // ]
}

module.exports = new IndexController();