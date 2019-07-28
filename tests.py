def test_transcription_extraction():
    from main import transcribe, keyword_extract, get_time_stamp
    file_name = 'sample.wav'
    text, items = transcribe(file_name)
    print(f'Text: {text}')
    keywords = keyword_extract(text)
    time_stamp = get_time_stamp(keywords, items)
    for keyword, time_dict in time_stamp.items():
        print(keyword)
        for elem in time_dict:
            print(elem)

