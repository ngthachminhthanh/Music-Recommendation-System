import React from 'react';

export default function MainContent({ user, songs }) {
    // Kiểm tra nếu songs không tồn tại hoặc không phải là mảng
    if (!songs || !Array.isArray(songs)) {
        return <div>Loading...</div>; // hoặc một thông báo lỗi thích hợp
    }

    // Lấy danh sách các nghệ sĩ duy nhất
    const uniqueArtists = React.useMemo(() => {
        return Array.from(new Set(songs.map(song => song.artist)))
            .map(artist => {
                const song = songs.find(song => song.artist === artist);
                return { artist, cover: song.cover };
            });
    }, [songs]);

    // Lấy ngẫu nhiên một số nghệ sĩ
    const randomArtists = React.useMemo(() => {
        return uniqueArtists.sort(() => 0.5 - Math.random()).slice(0, 4);
    }, [uniqueArtists]);

    if (!user) {
        return (
            <div style={{
                width: '97.25%',
                height: '74.3vh',
                paddingLeft: 90,
                marginLeft: '12.75px',
                background: 'linear-gradient(180deg, #2583da 0%, #1e6cb7 100%)',
                overflow: 'scroll',
                overflowX: 'hidden',
            }}>
                <div style={{ paddingBottom: 16 }}>
                    <h2>Các nghệ sĩ bạn có thể thích</h2>
                    <div style={{ display: 'flex', paddingTop: 18 }}>
                        {randomArtists.map((artist, index) => (
                            <div key={index} style={{ padding: '0 20px 10px' }}>
                                <img src={artist.cover} alt={artist.artist} style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: '50%',
                                    border: 'solid #333'
                                }} />
                                <h3>{artist.artist}</h3>
                                <h4>Nghệ sĩ</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Nếu người dùng đã đăng nhập, hiển thị nội dung trống tạm thời
    return (
        <div style={{
            width: '97.25%',
            height: '74.3vh',
            paddingLeft: 90,
            marginLeft: '12.75px',
            background: 'linear-gradient(180deg, #2583da 0%, #1e6cb7 100%)',
            overflow: 'scroll',
            overflowX: 'hidden',
        }}>
            <div style={{ paddingBottom: 16 }}>
                <h2>Các nghệ sĩ bạn có thể thích</h2>
                <div style={{ display: 'flex', paddingTop: 18 }}>
                    {/* Tạm thời để trống nếu người dùng đã đăng nhập */}
                </div>
            </div>
        </div>
    );
}
