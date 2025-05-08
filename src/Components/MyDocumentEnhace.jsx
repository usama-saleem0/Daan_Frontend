// components/MyDocumentEnhace.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link, Font } from '@react-pdf/renderer';

// Font registration (optional, you can add custom fonts too)
Font.register({
    family: 'Helvetica-Bold',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helvetica/Helvetica-Bold.ttf', fontWeight: 'bold' }
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica',
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 1.5,
        border: '1px solid #f39c12',
        backgroundColor: '#fffaf0',
        marginBottom: 25,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
        color: '#f39c12',
    },
    subheading: {
        fontSize: 14,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 12,
        color: '#666',
    },
    paragraph: {
        fontSize: 12,
        marginVertical: 6,
        textAlign: 'center',
        color: '#333',

    },
    image: {
        marginVertical: 10,
        width: '400px',
        height: '400px'
    },
    footer: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 10,
        color: '#777',
    },
    questionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10,
        marginBottom: 4,
        textAlign: 'center',
    },
    videoLink: {
        color: '#1a73e8',
        fontSize: 12,
        marginVertical: 4,
        textAlign: 'center',
    }
});

const MyDocumentEnhace = ({ bookData, chapterTitles }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Enhanced Book</Text>
        <Text style={styles.subheading}>
          "Every great story starts with a single page. This is yours."
        </Text>
        <Text style={styles.paragraph}>
          Welcome to a journey where imagination knows no limits, and every word holds a world of possibilities. 
          As you turn these pages, prepare to embark on an adventure that will challenge your thoughts, 
          stir your emotions, and leave an imprint on your soul.
        </Text>
        <Text style={styles.paragraph}>
          Take a deep breath, open your mind, and let the story unfold…
        </Text>
        <Text style={styles.footer}>Chapter 1 • Your Life</Text>
      </Page>
  
      {bookData?.data?.map((story, storyIndex) => {
        const isNewChapter =
          storyIndex === 0 ||
          story?.chapterId !== bookData.data[storyIndex - 1]?.chapterId;
  
        return (
          <Page key={story._id} size="A4" style={styles.page}>
            {isNewChapter && (
              <Text style={styles.mockHeading}>
                {chapterTitles[story.chapterId] || "Loading..."}
              </Text>
            )}
  
            {story?.messages?.map((message, messageIndex) => (
              <View key={message._id}>
                <View>
                  <Text style={styles.questionText}>
                    {story?.questionId?.question}
                  </Text>
                </View>
  
                {message.message && (
                  <Text style={styles.paragraph}>{message.message}</Text>
                )}
  
                {message?.images && message.images.length > 0 && (
                  <View>
                    {message.images.map((image, imageIndex) => (
                      <Image
                        key={imageIndex}
                        style={styles.image}
                        src={image}
                      />
                    ))}
                  </View>
                )}
  
                {message.videos && message.videos.length > 0 && (
                  <View>
                    {message.videos.map((video, videoIndex) => (
                      <Text key={videoIndex} style={styles.videoLink}>
                        <Link src={video}>🎥 Watch Video {videoIndex + 1}</Link>
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </Page>
        );
      })}
    </Document>
  );
export default MyDocumentEnhace;
