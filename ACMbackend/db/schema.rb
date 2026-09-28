# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_09_26_133129) do
  create_table "blog_categories", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "blog_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blog_id"], name: "index_blog_categories_on_blog_id"
    t.index ["category_id"], name: "index_blog_categories_on_category_id"
  end

  create_table "blog_tags", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "blog_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blog_id"], name: "index_blog_tags_on_blog_id"
    t.index ["tag_id"], name: "index_blog_tags_on_tag_id"
  end

  create_table "blogs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.string "subtitle"
    t.text "content"
    t.integer "clap"
    t.string "writer_name"
    t.string "writer_email"
    t.bigint "author_id"
    t.text "cover_image_url"
    t.datetime "published_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_blogs_on_author_id"
  end

  create_table "categories", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "core_positions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "event_registrations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "user_id", null: false
    t.datetime "registered_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_event_registrations_on_event_id"
    t.index ["user_id"], name: "index_event_registrations_on_user_id"
  end

  create_table "events", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "location"
    t.string "link"
    t.text "cover_image_url"
    t.datetime "start_time"
    t.datetime "end_time"
    t.boolean "is_sub_event"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "media_assets", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "entity_type", null: false
    t.bigint "entity_id", null: false
    t.string "file_name"
    t.text "file_url"
    t.string "content_type"
    t.bigint "byte_size"
    t.datetime "uploaded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["entity_type", "entity_id"], name: "index_media_assets_on_entity"
  end

  create_table "members", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone_no"
    t.string "linkedin"
    t.text "avatar_url"
    t.bigint "core_position_id"
    t.bigint "sig_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["core_position_id"], name: "index_members_on_core_position_id"
    t.index ["sig_id"], name: "index_members_on_sig_id"
  end

  create_table "project_proposal_users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "project_proposal_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_proposal_id"], name: "index_project_proposal_users_on_project_proposal_id"
    t.index ["user_id"], name: "index_project_proposal_users_on_user_id"
  end

  create_table "project_proposals", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "sig_id", null: false
    t.string "title"
    t.integer "year"
    t.string "duration"
    t.boolean "is_hosted"
    t.text "hosted_link"
    t.text "thumbnail_url"
    t.text "introduction"
    t.text "learning_outcomes"
    t.text "method_description"
    t.string "results"
    t.text "application"
    t.text "obstacles"
    t.text "conclusion"
    t.text "future_work"
    t.text "references"
    t.string "mentors"
    t.text "members"
    t.text "readme_md"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sig_id"], name: "index_project_proposals_on_sig_id"
  end

  create_table "projects", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "year_id", null: false
    t.bigint "sig_id", null: false
    t.string "title"
    t.string "duration"
    t.string "meet_link"
    t.text "description"
    t.text "method"
    t.text "results"
    t.text "obstacles"
    t.text "conclusion"
    t.text "references"
    t.text "mentors"
    t.text "members"
    t.text "cover_image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sig_id"], name: "index_projects_on_sig_id"
    t.index ["year_id"], name: "index_projects_on_year_id"
  end

  create_table "reference_links", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "project_proposal_id", null: false
    t.text "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_proposal_id"], name: "index_reference_links_on_project_proposal_id"
  end

  create_table "sig_events", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "sig_id", null: false
    t.string "name"
    t.text "description"
    t.datetime "event_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sig_id"], name: "index_sig_events_on_sig_id"
  end

  create_table "sigs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.text "title"
    t.text "description"
    t.text "vision"
    t.text "mission"
    t.text "motto"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_sigs_on_name", unique: true
  end

  create_table "sub_events", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.string "name"
    t.text "description"
    t.string "location"
    t.string "link"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_sub_events_on_event_id"
  end

  create_table "subscriptions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_subscriptions_on_category_id"
  end

  create_table "tags", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "phone_no"
    t.string "linkedin"
    t.text "avatar_url"
    t.bigint "core_position_id", null: false
    t.bigint "sig_id", null: false
    t.string "reset_password_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["core_position_id"], name: "index_users_on_core_position_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["sig_id"], name: "index_users_on_sig_id"
  end

  create_table "years", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["year"], name: "index_years_on_year", unique: true
  end

  add_foreign_key "blog_categories", "blogs"
  add_foreign_key "blog_categories", "categories"
  add_foreign_key "blog_tags", "blogs"
  add_foreign_key "blog_tags", "tags"
  add_foreign_key "blogs", "users", column: "author_id"
  add_foreign_key "event_registrations", "events"
  add_foreign_key "event_registrations", "users"
  add_foreign_key "members", "core_positions"
  add_foreign_key "members", "sigs"
  add_foreign_key "project_proposal_users", "project_proposals"
  add_foreign_key "project_proposal_users", "users"
  add_foreign_key "project_proposals", "sigs"
  add_foreign_key "projects", "sigs"
  add_foreign_key "projects", "years"
  add_foreign_key "reference_links", "project_proposals"
  add_foreign_key "sig_events", "sigs"
  add_foreign_key "sub_events", "events"
  add_foreign_key "subscriptions", "categories"
  add_foreign_key "users", "core_positions"
  add_foreign_key "users", "sigs"
end
