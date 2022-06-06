import React from 'react';





const Onepost = ({ post, postText }) => {
    const [value, setValue] = React.useState('Controlled');



    return (
        <div>
        <div>
<h1>{post._id}</h1>

        </div>
        <div>
    <h1>{post.postText}</h1>
    </div>
    <div>
    <h1>{post.postTitle}</h1>
    </div>
    <div>
    <h1>Comments: {post.commentCount}</h1>
    </div>
    <div>
    <h1>{post.username}</h1>
    </div>
    <div>
    <h1>{post.createdAt}</h1>
    </div>
    </div>
)
}

export default Onepost;