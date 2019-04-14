'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('tracks', {
    trkTrackId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,      
      field: 'trk_track_id'
    },
    trkUserId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'usr_user_id'
      },
      field: 'trk_user_id'
    },
    trkTrackName: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: '',
      field: 'trk_track_name'
    },
    trkTrackArtist: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      field: 'trk_track_artist'
    },
    trkTrackAlbum: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      field: 'trk_track_album'
    },
    trkTrackUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      field: 'trk_track_url'
    },
    trkTrackIcon: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      field: 'trk_track_icon'
    },
    trkTrackInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
      field: 'trk_track_info'
    },
  }, {
    timestamps: true,
    tableName: 'tracks'
  });
};