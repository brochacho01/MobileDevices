import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  Pressable,
  Image,
} from 'react-native';
import ReplyButton from './components/replyButton';
import UpvoteButton from './components/upvoteButton';
import DeleteButton from './components/deleteButton';
import DeleteReply from './components/deleteReply';
import EditButton from './components/editButton';
import EditReply from './components/editReply';
import { render } from '@testing-library/react-native';

const App = () => {

  const data = require('./assets/data/data.json');

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [userName, setUserName] = useState('');
  const [replyUsers, setReplyUsers] = useState([]);
  const [isPreLoaded, setIsPreLoaded] = useState(false);
  const [atUsername, setAtUsername] = useState('');


  // This next section is for pre-loading the comments and replies from the data.json file
  let path = './assets/images/avatars/';
  const avatars = {
    juliusomo: require(path + 'image-juliusomo.png'),
    amyrobson: require(path + 'image-amyrobson.png'),
    maxblagun: require(path + 'image-maxblagun.png'),
    ramsesmiron: require(path + 'image-ramsesmiron.png')
  };

  const toRender = {

    // Current user info, not an actual comment
    currentUserInfo: {
      username: data.currentUser.username,
      avatar: avatars[data.currentUser.username]
    },

    // First commen to be pre loaded. No replies.
    comment1: {
      username: data.comments[0].user.username,
      avatar: avatars[data.comments[0].user.username],
      commentText: data.comments[0].content,
      date: data.comments[0].createdAt,
      score: data.comments[0].score,
    },

    // Second comment to be pre loaded. Has 2 replies.
    comment2: {
      username: data.comments[1].user.username,
      avatar: avatars[data.comments[1].user.username],
      commentText: data.comments[1].content,
      date: data.comments[1].createdAt,
      score: data.comments[1].score,
    },

    // Replies are replies to comment2
    // First reply info
    reply1: {
      username: data.comments[1].replies[0].user.username,
      avatar: avatars[data.comments[1].replies[0].user.username],
      commentText: data.comments[1].replies[0].content,
      date: data.comments[1].replies[0].createdAt,
      score: data.comments[1].replies[0].score,
      replyTo: data.comments[1].replies[0].replyingTo,
    },

    // Second reply info
    reply2: {
      username: data.comments[1].replies[1].user.username,
      avatar: avatars[data.comments[1].replies[1].user.username],
      commentText: data.comments[1].replies[1].content,
      date: data.comments[1].replies[1].createdAt,
      score: data.comments[1].replies[1].score,
      replyTo: data.comments[1].replies[1].replyingTo,
    },

  }

  // These functions are for rendering the pre-loaded comments and replies
  const renderC1 = () => {
    setCommentText(toRender.comment1.commentText);
    setComments([...comments, {
      text: toRender.comment1.commentText, replies: [], replyUsers: [], myName: toRender.comment1.username, timeStamp: toRender.comment1.date, replyTimes: [],
      myAvatar: toRender.comment1.avatar, replyAvatars: [], score: toRender.comment1.score, replyScores: [], replyAts: [],
    }])
    setCommentText('');
  };

  const renderC2 = () => {
    setCommentText(toRender.comment2.commentText);
    setComments([...comments, {
      text: toRender.comment2.commentText, replies: [], replyUsers: [], myName: toRender.comment2.username, timeStamp: toRender.comment2.date, replyTimes: [],
      myAvatar: toRender.comment2.avatar, replyAvatars: [], score: toRender.comment2.score, replyScores: [], replyAts: [],
    }])
    setCommentText('');
  };

  const renderR1 = () => {
    setReplyText(toRender.reply1.commentText);
    let updatedComments = [...comments];
    updatedComments[1].replyUsers.push(toRender.reply1.username);
    updatedComments[1].replyTimes.push(toRender.reply1.date);
    updatedComments[1].replyAvatars.push(toRender.reply1.avatar);
    updatedComments[1].replyScores.push(toRender.reply1.score);
    updatedComments[1].replyAts.push('@'+toRender.reply1.replyTo)
    updatedComments[1].replies.push(toRender.reply1.commentText);
    setComments(updatedComments);
    setReplyText('');
  };

  const renderR2 = () => {
    setReplyText(toRender.reply2.commentText);
    let updatedComments = [...comments];
    updatedComments[1].replyUsers.push(toRender.reply2.username);
    updatedComments[1].replyTimes.push(toRender.reply2.date);
    updatedComments[1].replyAvatars.push(toRender.reply2.avatar);
    updatedComments[1].replyScores.push(toRender.reply2.score);
    updatedComments[1].replyAts.push('@'+toRender.reply2.replyTo)
    updatedComments[1].replies.push(toRender.reply2.commentText);
    setComments(updatedComments);
    setReplyText('');
  };


  const preLoadComments = () => {
    if (isPreLoaded) return;
    if (comments && !comments.length) {
      setUserName(data.currentUser.username);
      renderC1();
    } else if (comments.length === 1) {
      renderC2();
    } else if (!comments[1].replies.length) {
      renderR1();
    } else if (comments[1].replies.length === 1) {
      renderR2();
      setIsPreLoaded(true);
    }
  }

  preLoadComments();

  // Now app.js functionality
  // Should make replies its own map of text and subcomments
  const addComment = () => {
    if (commentText !== '') {
      setComments([...comments, {
        text: commentText, replies: [], replyUsers: [], myName: userName, timeStamp: "just now", replyTimes: [], myAvatar: avatars[userName],
        replyAvatars: [], score: 0, replyScores: [], replyAts: [],
      }]);
      setCommentText('');
    }
  };

  //function to edit comment at index
  const editComment = (index, text) => {
    let updatedComments = [...comments];
    updatedComments[index].text = text;
    setComments(updatedComments);
  };

  //function to edit reply at index
  const editReply = (index, text, item) => {
    let updatedReplies = [...item.replies];
    updatedReplies[index] = text;
    item.replies = updatedReplies;
    setComments([...comments]);
  };

  const removeComment = (index) => {
    let updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const removeReply = (item, index) => {
    let updatedReplies = [...item.replies];
    updatedReplies.splice(index, 1);
    item.replies = updatedReplies;
    setComments([...comments]);
  };

  // Add a reply to the comments array
  const addReply = (index) => {
    if (replyText !== '') {
      let updatedComments = [...comments];
      updatedComments[index].replyUsers.push(userName);
      updatedComments[index].replyTimes.push("just now");
      updatedComments[index].replyAvatars.push(avatars[userName]);
      updatedComments[index].replyScores.push(0);
      updatedComments[index].replyAts.push(atUsername)
      updatedComments[index].replies.push(replyText);
      setComments(updatedComments);
      setReplyText('');
    }
  };

  // Render a reply to a comment, this will get called multiple times if a single comment has multiple replies
  const renderReply = ({ replyText, commentIndex, replyIndex, comment }) => (
    <View style={styles.replyList}>
      <View style={styles.replyContainer}>

        {/* Profile data of user */}
        <View style={styles.userInfo}>
          <Image source={avatars[comments[commentIndex].replyUsers[replyIndex]]} />
          <Text style={styles.userName}>{comments[commentIndex].replyUsers[replyIndex]}</Text>
          {comments[commentIndex].replyUsers[replyIndex] === data.currentUser.username ? <Text style={styles.isMe}>You</Text> : null}
          <Text style={styles.userAge}>{comments[commentIndex].replyTimes[replyIndex]}</Text>
        </View>

        {/* Actual content of a comment */}
        <Text style={styles.replyText}><Text style={styles.replyAt}>{comments[commentIndex].replyAts[replyIndex]} </Text>{replyText}</Text>
        <View style={styles.replyInputContainer}>

          {/* Buttons to interact with a comment */}
          <UpvoteButton score={comments[commentIndex].replyScores[replyIndex]}> </UpvoteButton>

          {/* This structure is meant to control what buttons are available to you based on if you made the given comment/reply or not */}
          <View style={styles.replyInputSub}>

            {
              comments[commentIndex].replyUsers[replyIndex] === userName &&
              <EditReply index={replyIndex} editReply={editReply} item={comment} text2={replyText}></EditReply>
            }

            {
              comments[commentIndex].replyUsers[replyIndex] === userName &&
              <DeleteReply index={replyIndex} removeReply={removeReply} item={comment}></DeleteReply>
            }
          </View>          

          {
              comments[commentIndex].replyUsers[replyIndex] !== userName &&
              <ReplyButton addReply={addReply} title="Reply" idx={commentIndex} setReply={setReplyText} commentUser={comments[commentIndex].replyUsers[replyIndex]} setAtUsername={setAtUsername}/>
            }

        </View>
      </View>
    </View>
  );
  
  // Render an individual comment and its replies
  const renderItem = ({ item, index, }) => (
    <View style={styles.commentContainer}>


      <View style={styles.commentBar}>

        {/* Profile data of user */}
        <View style={styles.userInfo}>
          <Image source={item.myAvatar} />
          <Text style={styles.userName}>{item.myName}</Text>
          {item.myName === data.currentUser.username ? <Text style={styles.isMe}>You</Text> : null}
          <Text style={styles.userAge}>{item.timeStamp}</Text>
        </View>

        {/* Actual content of a comment */}
        <Text style={styles.commentText}>{item.text}</Text>

        <View style={styles.replyInputContainer}>

          {/* Buttons to interact with a comment */}
          <UpvoteButton score={item.score}></UpvoteButton>

          {/* This structure is meant to control what buttons are available to you based on if you made the given comment/reply or not */}
          <View style={styles.replyInputSub}>
            

            {
              comments[index].myName === userName &&
              <EditButton index={index} editComment={editComment} comment={item.text}></EditButton>
            }

            {
              comments[index].myName === userName &&
              <DeleteButton index={index} removeComment={removeComment}></DeleteButton>
            }
          </View>

          {
              comments[index].myName !== userName &&
              <ReplyButton addReply={addReply} title="Reply" idx={index} setReply={setReplyText} commentUser={item.myName} setAtUsername={setAtUsername}/>
            }

        </View>
      </View>
      {/* Render all of the replies to a given comment */}
      {item.replies.map((reply, i) => (
        renderReply({replyText: reply, commentIndex: index, replyIndex: i, comment: item })
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.subContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
      >
        {/* This is our actual list of comments */}
        <FlatList
          style={styles.commentsList}
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: 'hsl(223, 19%, 93%)' }} />}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={commentText}
            onChangeText={setCommentText}
            placeholder='Add a comment'
            onSubmitEditing={addComment}
          />
          <TouchableOpacity style={styles.addButton} onPress={addComment}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style={{ height: (Platform.OS === 'ios') ? 0 : 18 }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(223, 19%, 93%)',
  },
  subContainer: {
    flex: 1,
  },
  commentsList: {
    flex: 1,
    marginBottom: 10,
    width: '95%',
    marginTop: 10,
    marginHorizontal: '2.5%',
  },
  commentContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  commentBar: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  isMe: {
    fontSize: 16,
    textAlign: 'center',
    color: 'hsl(0, 0%, 100%)',
    backgroundColor: 'hsl(238, 40%, 52%)',
    marginLeft: 5,
    width: 40,
  },
  commentText: {
    fontSize: 16,
  },
  replyList: {
    flex: 1,
    marginLeft: 20,
    // paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  replyContainer: {
    // marginVertical: 5,
    paddingLeft: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  replyText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 2,
  },
  replyAt: {
    fontSize: 16,
    color: 'hsl(238, 40%, 52%)',
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  replyInputSub: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 10,
  },
  replyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    fontSize: 14,
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'hsl(0, 0%, 100%)',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#3F51B5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  scrollable: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
  buttonTextPressed: {
    opacity: 0.5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  userAge: {
    fontSize: 16,
    marginLeft: 15,
  },
});

export default App;
