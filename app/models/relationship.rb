class Relationship < ApplicationRecord
  after_create :add_notification

  belongs_to :follower, class_name: "User"
  belongs_to :followed, class_name: "User"
  validates :follower_id, presence: true
  validates :followed_id, presence: true

  
    def add_notification
      if check_notification_exists
        AddNotificationJob.set(wait: 15.seconds).perform_later(self.follower_id, self.followed_id, self.created_at)    
      end    
    end

    def check_notification_exists
      Relationship.where("created_at > :start AND created_at < :end", {start: (self.created_at - 15), end: self.created_at}).blank?
    end
end