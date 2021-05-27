package me.haroldmartin.flippertabulardemo

import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        findViewById<Button>(R.id.send_analytics_data).setOnClickListener { sendAnalyticsData() }
        findViewById<Button>(R.id.send_other_analytics_data).setOnClickListener { sendOtherAnalyticsData() }
        findViewById<Button>(R.id.send_user_data).setOnClickListener { sendUserData() }
    }

    private fun sendAnalyticsData() {
        PluginProvider.tabularPlugin.addRecords(
            "analytics",
            listOf(
                mapOf(
                    "ts" to 123,
                    "name" to "hi",
                    "value" to 4.5,
                    "is_good" to true
                ),
                mapOf(
                    "ts" to 456,
                    "name" to "sup",
                    "is_good" to mapOf("inner" to "nested")
                )
            )
        )
    }

    private fun sendOtherAnalyticsData() {
        PluginProvider.tabularPlugin.addRecords(
            "analytics",
            listOf(
                mapOf(
                    "some new info" to 8765,
                    "test" to "do or do not",
                    "attention" to true,
                ),
                mapOf(
                    "yo" to "dawg",
                    "!" to "?"
                )
            )
        )
    }

    private fun sendUserData() {
        PluginProvider.tabularPlugin.addRecords(
            "users",
            listOf(
                mapOf(
                    "first_name" to "Harold",
                    "last_name" to "martin",
                    "username" to "hbmartin"
                ),
                mapOf(
                    "first_name" to "Cody",
                    "last_name" to "W",
                    "username" to "cdubs"
                )
            )
        )
    }
}
