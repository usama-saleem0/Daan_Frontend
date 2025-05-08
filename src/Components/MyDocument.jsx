// components/MyDocument.jsx
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
    marginBottom:25,
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

const MyDocument = ({ groupedData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>A New Beginning</Text>
      <br />
      <Text style={styles.subheading}>
        "Every great story starts with a single page. This is yours."
      </Text>
      <Text style={styles.paragraph}>
        Welcome to a journey where imagination knows no limits...
      </Text>
      <Text style={styles.paragraph}>
        Take a deep breath, open your mind, and let the story unfold…
      </Text>
      <Text style={styles.footer}>Chapter 1 • Your Life</Text>
    </Page>

    {Object.keys(groupedData).map((chapterId) => {
      const chapter = groupedData[chapterId];
      return (
        <Page key={chapterId} size="A4" style={styles.page}>
          <Text style={styles.heading}>{chapter.chapterTitle}</Text>

          {chapter.chapterImage && (
            <Image style={styles.image} src={chapter.chapterImage}  />
          )}

          {Object.keys(chapter.questions).map((questionId) => {
            const question = chapter.questions[questionId];

            return question.messages.map((message, messageIndex) => (
              <View key={message._id} style={{ textAlign: "center" }}>
<br />

                {messageIndex === 0 && (
                  <Text style={styles.questionText}>
                    {question.questionText}
                  </Text>
                )}
<br />
                <Text style={styles.paragraph}>{message.message}</Text>

                {message.images &&
                  message.images.map((img, i) => (
                    <Image key={i} style={styles.image} src={img} />
                  ))}

                {message.videos &&
                  message.videos.map((video, i) => (
                    <Text key={i} style={styles.videoLink}>
                      <Link src={video}>🎥 Watch Video {i + 1}</Link>
                    </Text>
                  ))}
              </View>
            ));
          })}
        </Page>
      );
    })}
  </Document>
);

export default MyDocument;
