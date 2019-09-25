require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    let(:image_path) {File.open("#{Rails.root}/public/images/test_image.jpg")}
    let(:image) { Rack::Test::UploadedFile.new(image_path) }
    context 'can save' do
      it 'is valid with content' do
        expect(build(:message, image: nil)).to be_valid
      end
      #画像があれば保存できるか？

      it 'is valid with image' do
        expect(build(:message, content: nil)).to be_valid
      end
      #メッセージがあれば保存できるか？

      it 'is valid with content and image' do
        expect(build(:message)).to be_valid
      end
      #メッセージと画像があれば保存できるか？
    end

    context 'can not save' do
      it 'is invalid without content and image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
        #メッセージも画像もないと保存できない？
      end

      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
        #グループidがないと保存できない？
      end

      it 'is invaid without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
        #ユーザーidがないと保存できない？
      end
    end
  end
end